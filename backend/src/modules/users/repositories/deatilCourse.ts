import Knex from '../../../infrastructure/config/postgres'
import redisClient from '../../../infrastructure/config/redisClient';

class repositorieDetailCourse {
    async searchDetail(id: number){
        try{
            // busca o as informações do curso e o dono, através do id do curso
            const data = await Knex('course')
            .join('users', 'course.owner', '=', 'users.id')
            .select('course.id as id_course', 'course.name', 'course.description', 'course.price', 'course.price_promotion', 'course.promotion', 'course.owner', 'course.image', 'users.id as id_user', 'users.first_name', 'users.last_name').where('course.id', id).first()

            // Buscamos todos os requisitos e tags relacionadas ao curso, através tbm do id do curso
            data.technologies = []
            data.requisits = []

            const technologies = await Knex('course_technologie as ct')
            .join('technologies as tech', 'ct.tech_id', '=', 'tech.id')
            .select('tech.id', 'tech.tech')
            .where('ct.course_id', id)

            const requisits = await Knex('course_requisits')
            .select('id', 'requisit').where('course_id', id)

            for (const r of requisits){
                data.requisits.push({id: r.id, requisit: r.requisit})
            }

            for (const techs of technologies){
                data.technologies.push({id: techs.id, tech: techs.tech})
            }

            // -------------------------------------------------------------------------
            // VERIFICAÇÃO DA LISTA DE FAVORITOS E SE O USUÁRIO ESTÁ LOGADO PARA CONTROLE DE ESTADOS NO FRONTEND

            // Aqui embaixo realizo uma lógica para saber se o usuário logado possui este curso em sua lista de favoritos, com esse resultado eu controlo no frontend o botão de adicionar ou remover curso da lista de favoritos.

            // primeiro: busco se há um usuário logado
            const cacheUser = await redisClient.get('user')
            const user = await JSON.parse(cacheUser.toString())

            // SE O USUÁRIO NÃO ESTIVER LOGADO 
            // Eu já retorno as informações do curso 
            // user: null -> mostra exatamente que não há nenhum usuário logado, se sim retornarei o seu id.
            //  favorite: {status: false, id: null} -> mostra que o curso não está em sua lista de favoritos e logo não retorna o seu id
            if(!user.login) return{status: true, data: data, user: null, favorite: {status: false, id: null}, code: 200}

            // SE O USUÁRIO ESTIVER LOGADO
            // verifico se o id do curso e o id do usuário corresponsem na tabela 
            const favorite = await Knex.select('*').where({
                course_id: id,
                id_user: user.id
            }).from('list_favorites')

            // SE HOUVER UM CURSO NA LISTA
            // {status: true, id: favorite[0].id} -> retorno true indicando que o curso está na lista de favoritos do usuário e o id do curso, que será usado para remover da lista de favoritos o removendo diretamente 
            if(favorite.length > 0){
                return{status: true, data: data, user: user.id, favorite: {status: true, id: favorite[0].id}}
            }

            // SE NÃO HOUVER UM CURSO NA LISTA
            // favorite: {status: false, id: null} -> mostra que o curso não está em sua lista de favoritos e logo não retorna o seu id
            // Aqui retornaos o id do usuário, para que possamos verificar no frontend se corresponse ao owner do curso, se sim, não poderá add ao carrinho e interagit com a lista de favoritos
            return{status: true, data: data, user: user.id, favorite: {status: false, id: null}, code: 200}
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao buscar os detalhes do curso no banco de dados.'}
        }
    }
}


export default new repositorieDetailCourse()