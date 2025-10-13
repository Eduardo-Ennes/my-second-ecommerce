import Knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const knex = Knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
})

export default knex