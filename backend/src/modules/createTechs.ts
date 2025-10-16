import Knex from '../infrastructure/config/postgres'

const techs = [
    {name: 'javascript'},
]

export default async function createTechs(){
    for (const tech of techs) {
       await Knex('technologies').insert({tech: tech.name})
    }
}