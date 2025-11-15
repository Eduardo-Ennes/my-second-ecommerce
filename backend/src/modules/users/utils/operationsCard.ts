import redisClient from "../../../infrastructure/config/redisClient"
import Knex from '../../../infrastructure/config/postgres'


class operations {
    async add(id: number){
        try{
            const cacheCard = await redisClient.get('card')
            if(!cacheCard) {
                return{status: false, error: 'Houve um error inesperado na sessão do carrinho. Tente novamente.', code: 500}
            }

            const card = await JSON.parse(cacheCard?.toString())
            const data = await Knex('course as c')
            .join('users as u', 'c.owner', '=', 'u.id')
            .select('c.id', 'c.name', 'c.price', 'c.price_promotion', 'c.promotion', 'c.owner', 'c.image', 'u.first_name', 'u.last_name')
            .where('c.id', id).first()

            const exist = card[0].some((element: any) => element.id == data.id)
            if(exist){
                return{status: false, error: 'Este curso já foi adicionado ao carrinho.', code: 409}
            }

            card[0].push(data)

            // toFixed() não pode ser usado diretamente no número que seria setado, pq retorna uma string, e no redis setei o número inicial do total como string, então deve-se fazer as conversões para que se possa fazer as somas matemática. Usanso toFixed depois o valor ja se torna string e já pode ser setado como um novo valor no redis.
            if(data.promotion){
                const price = Number(card[1].total) + Number(data.price_promotion)
                card[1].total = price.toFixed(2)
            }else{
                const price = Number(card[1].total) + Number(data.price)
                card[1].total = price.toFixed(2)
            }

            await redisClient.set('card', JSON.stringify(card))
            return{status: true, code: 200}
        }catch(error){
            return{status: false, error: 'Houve um error ao adicionar o curso no carrinho de compras.', code: 500}
        }
    }


    async del(id: number){
        try{
            const cacheCard = await redisClient.get('card')
            if(!cacheCard) {
                return{status: false, error: 'Houve um error inesperado na sessão do carrinho. Tente novamente.', code: 500}
            }

            const card = await JSON.parse(cacheCard?.toString())
            const data = await Knex.select('id', 'price', 'price_promotion', 'promotion').where({id: id}).from('course').first()

            const exist = card[0].some((element: any) => element.id == data.id)
            if(!exist){
                return{status: false, error: 'O curso não foi encontrado no carrinho de compras', code: 404}
            }

            // Aqui é gerado um novo array, mas excluindo o curso com id passado como paramêtro
            const newCard = card[0].filter((element: any) => element.id !== data.id)

            // toFixed() não pode ser usado diretamente no número que seria setado, pq retorna uma string, e no redis setei o número inicial do total como string, então deve-se fazer as conversões para que se possa fazer as somas matemática. Usanso toFixed depois o valor ja se torna string e já pode ser setado como um novo valor no redis.
            if(data.promotion){
                const price = Number(card[1].total) - Number(data.price_promotion)
                card[1].total = price.toFixed(2)
            }else{
                const price = Number(card[1].total) - Number(data.price)
                card[1].total = price.toFixed(2)
            }
            
            await redisClient.set('card', JSON.stringify([newCard, card[1]]))
            return{status: true, code: 200}
        }catch(error){  
            return{status: false, error: 'Houve um error ao remover o curso do carrinho de compras.', code: 500}
        }
    }
}


export default new operations()