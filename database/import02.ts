import { Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config({
    path: '../.env'
})


import XLSX from 'xlsx'
// import { hashPassword } from '../utils/hash'

// console.log(process.env);

export const client = new Client({
    // database: 'lost_and_found',
    // user: 'postgres',
    // password: 'postgres'
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
})

console.log(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD)

interface User {
    username: string
    password: string
    living_address: string
    working_address: string
    phone_number: number
    email: string
    is_admin: boolean
    image: string
}

interface Item {
    is_LostorFound: boolean
    name: string
    description: string
    location: string
    happened_at: Date
    category: string
    is_free: boolean
    status: boolean
    created_by: string
}

interface Likes {
    user_id: number
    item_id: number
}

interface Tags {
    name: string
}

interface Items_tags {
    item_id: number
    tag_id: number
}

interface Item_images {
    item_id: number
    images: string
}

interface Categories {
    category: string
}

interface Notifications {
    receiver_id: number
    sender_id: number
    item_id: number
    content: string
}

interface Messages {
    receiver_id: number
    sender_id: number
    content: string
}

async function main() {
    await client.connect() // "dial-in" to the postgres server
    // await client.query(` truncate LIKES  restart identity CASCADE`)
    // await client.query(` truncate USERS  restart identity CASCADE`)
    // await client.query(` truncate memos   restart identity CASCADE`)
    let workbook = XLSX.readFile('lost_database.xlsx')
    let users: User[] = XLSX.utils.sheet_to_json(workbook.Sheets['users'])
    let items: Item[] = XLSX.utils.sheet_to_json(workbook.Sheets['items'])
    let likes: Likes[] = XLSX.utils.sheet_to_json(workbook.Sheets['likes'])
    let tags: Tags[] = XLSX.utils.sheet_to_json(workbook.Sheets['tags'])
    let items_tags: Items_tags[] = XLSX.utils.sheet_to_json(workbook.Sheets['items_tags'])
    let item_images: Item_images[] = XLSX.utils.sheet_to_json(workbook.Sheets['item_images'])
    let categories: Categories[] = XLSX.utils.sheet_to_json(workbook.Sheets['categories'])
    let notifications: Notifications[] = XLSX.utils.sheet_to_json(workbook.Sheets['notifications'])
    let messages: Messages[] = XLSX.utils.sheet_to_json(workbook.Sheets['messages'])
    // console.log((await client.query('select * from users')).rows)
    const user = {
        username: "gordon",
        password: "tecky",
    };

    for (let user of users) {
        // DANGER :  sql injection!!!
        // await client.query("INSERT INTO users (username,password) values ('" + "'','');DROP table memos; --" + "'  ,'tecky')");
        // await client.query(`INSERT INTO users (username,password) values ('${user.username}','${user.password}')`);

        // let hashedPassword = await hashPassword(user.password)console.log(user.username, user.password, user.living_address, user.working_address, user.phone_number, user.email, user.is_admin, user.image)
        await client.query(
            'INSERT INTO users (username,password,living_address,working_address,phone_number,email,is_admin,image) values ($1,$2,$3,$4,$5,$6,$7,$8)',
            [user.username, user.password, user.living_address, user.working_address, user.phone_number, user.email, user.is_admin, user.image]
        )
    }

    for (let item of items) {

        await client.query('INSERT INTO items (is_LostorFound,name,description,location,happened_at,category,is_free,status, created_by) values ($1,$2,$3,$4,$5,$6,$7,$8, $9)',
            [item.is_LostorFound, item.name, item.description, item.location, item.happened_at || 'NOW()', item.category, item.is_free, item.status, item.created_by]
        )
    }

    for (let like of likes) {

        await client.query('INSERT INTO likes (user_id,item_id) values ($1,$2)',
            [like.user_id, like.item_id]
        )
    }

    for (let tag of tags) {

        await client.query('INSERT INTO tags (name) values ($1)',
            [tag.name]
        )
    }

    for (let items_tag of items_tags) {

        await client.query('INSERT INTO items_tags (item_id,tag_id) values ($1,$2)',
            [items_tag.item_id, items_tag.tag_id]
        )
    }

    for (let item_image of item_images) {
        console.log(item_image.item_id, item_image.images)
        await client.query('INSERT INTO item_images (item_id,images) values ($1,$2)',
            [item_image.item_id, item_image.images]
        )
    }

    for (let categorie of categories) {
        await client.query('INSERT INTO categories (category) values ($1)',
            [categorie.category]
        )
    }

    for (let notification of notifications) {
        await client.query('INSERT INTO notifications (receiver_id,sender_id,item_id,content) values ($1,$2,$3,$4)',
            [notification.receiver_id, notification.sender_id, notification.item_id, notification.content]
        )
    }

    for (let message of messages) {
        await client.query('INSERT INTO messages (receiver_id,sender_id,content) values ($1,$2,$3)',
            [message.receiver_id, message.sender_id, message.content]
        )
    }


    const result = await client.query('SELECT * from users')

    // console.log(result.rows)

    // insert data into likes table
    // await client.query(
    // 	'INSERT INTO likes (user_id,memo_id) values ($1,$2),($3,$4)',
    // 	[1, 1, 1, 2]
    // )

    console.log(result.rows[0].username);

    await client.end() // close connection with the database
}
main()