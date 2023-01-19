import { Client } from 'pg'
import { env } from './env'

export const client = new Client({
    database: env.DB_NAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD
})
client.connect()
