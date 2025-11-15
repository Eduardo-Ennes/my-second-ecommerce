// Está função terá como responsabilidade verificar se o usuário que realizou login é dono(a) ou proprietário(a) de um dos cursos que estão no carrinho de compras, não pode-se permitir que um usuário compre ou adicione ao carrinho o seu próprio curso.

import redisClient from '../../../infrastructure/config/redisClient'

// Nesta função retornamos status: true em todas para que não haja conflito no frontend. Aqui mesmo que esteja incorreto, não impossibilitará o login do usuário, apenas será recriado o carrinho de compras. No repositorio onde autenticamos o usuário retorna status true ou false, e isso é importante no frontend para que possamos mostrar o error e controlar condições, por isso, novamemnte, aqui não impossibilitará o login do usuário. Também há mais explicação no template de login.
export async function verifyCardLogin(id: number){
    try{
        const cacheCard = await redisClient.get('card')
        if(!cacheCard){
            // Por algum acaso o carrinho não tenha sido criado
            await redisClient.set('card', JSON.stringify([[], {total: '0'}]))
            return{status: true, error: 'Houve um erro inesperado com o seu carrinho. Ele foi recriado.'}
        }

        // Busca o carrinho no redis
        var cache = JSON.parse(cacheCard.toString())
        
        // Verifica se owner do curso corresponde ao id do usuário
        const exist = cache[0].some((element: any) => element.owner === id)
        if(exist){
            await redisClient.del('card')
            await redisClient.set('card', JSON.stringify([[], {total: '0'}]))
            return{status: true, error: 'CONFLITO! Encontramos no carrinho de compras cursos aonde você é proprietário. O carrinho será recriado.'}
        }

        return{status: true}
    }catch(error){
        await redisClient.del('card')
        await redisClient.set('card', JSON.stringify([[], {total: '0'}]))
        return{status: true, error: 'Houve um error ao verificar o carrinho de compras após o login. Ele será recriado.'}
    }
}