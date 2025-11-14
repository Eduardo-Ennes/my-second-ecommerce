import Knex from '../../../infrastructure/config/postgres'
import redisClient from '../../../infrastructure/config/redisClient';

class repositorieDetailCourse {
    async searchDetail(id: number){
        try{
            const data = await Knex('course')
            .join('users', 'course.owner', '=', 'users.id')
            .select('course.id as id_course', 'course.name', 'course.description', 'course.price', 'course.price_promotion', 'course.promotion', 'course.owner', 'course.image', 'users.id as id_user', 'users.first_name', 'users.last_name').where('course.id', id).first()

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

            const cacheUser = await redisClient.get('user')
            let user = null
            if(cacheUser){
                const convert = await JSON.parse(cacheUser?.toString())
                user = convert.id
            }else{
                user = null
            }

            const favorite = await Knex.select('*').where({
                course_id: id,
                id_user: user
            }).from('list_favorites')

            if(favorite.length > 0){
                return{status: true, data: data, user: user, favorite: {status: true, id: favorite[0].id}}
            }

            return{status: true, data: data, user: user, favorite: {status: false}, code: 200}
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao buscar os detalhes do curso no banco de dados.'}
        }
    }
}


export default new repositorieDetailCourse()