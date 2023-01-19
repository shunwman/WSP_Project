import express, { Request, Response } from 'express'
import { logger } from '../utils/logger'
// import { io } from '../server'
import { formParse } from '../utils/upload'
import { client } from '../utils/db'
// import { isLoggedin } from '../utils/guard'
import { io } from '../utils/setIO'



// import { request } from 'http'
export const itemsRoutes = express.Router()

itemsRoutes.post('/formidable', postLostItem);
itemsRoutes.get('/item-single/:itemId', getItemSingle)
itemsRoutes.get('/item-single-map/:itemId', getItemSingle2)
itemsRoutes.get('/my-posts', getMyPosts)
itemsRoutes.delete('/del-my-posts', deleteMyPosts)
itemsRoutes.get('/search', searchItems)
// itemsRoutes.get('/itemNotification', getNewItem)



itemsRoutes.put('/', async (req, res) => {
    try {
        const type = req.body.type
        const name = req.body.name
        const image = req.body.image
        const description = req.body.description
        const location = req.body.location
        const happenedAt = req.body.happened_at
        const categoryId = req.body.categoryId
        const isFree = req.body.reward
        const isSolve = req.body.is_solved
        const createdBy = req.body.created_by
        const index = req.body.index

        if (!index || !Number(index)) {
            res.status(400).json({
                message: 'index is invalid'
            })
            return
        }


        logger.debug('is_lost_or_found', type)
        logger.debug('text', name)
        logger.debug('location', location)
        logger.debug('description', description)
        logger.debug('happened_at', happenedAt)
        logger.debug('categories', categoryId)
        logger.debug('reward', isFree)
        logger.debug('is_solved', isSolve)
        logger.debug('created_at', createdBy)
        logger.debug('image', image)
        logger.debug('index : ' + index)

        await client.query(`update items set (type,name,description,location,happened_at,category_id,is_free,status, created_by,image) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) where id = $10`, [
            type, name, description, location, happenedAt, categoryId, isFree, isSolve, createdBy, Number(index), image
        ])


        res.json({
            message: 'success'
        })
        return
    } catch (err: any) {
        console.log(err.message)
        logger.error(err.message)

        res.status(400).send('Update error: ' + err.message)
        return
    }
})



itemsRoutes.get('/', async (req, res) => {
    // const items = await jsonfile.readFile(path.join(__dirname, '../items.json'))
    const itemResult = await client.query(
        'select i.*, c.category from items i join categories c on i.category_id = c.id where is_deleted = false ORDER BY created_at DESC'
    )
    // console.log(itemResult)
    res.json(itemResult.rows)
    return
})




//'/formidable'
async function postLostItem(req: Request, res: Response) {
    try {
        console.log('req.body', req.body);
        // const isLostOrFound = req.body.isLostOrFound;
        // const itemName = req.body.itemName;
        // const itemImage = req.body.itemImage
        // const description = req.body.description
        // const location = req.body.location
        // const happenedAt = req.body.happenedAt
        // const category = req.body.category
        // const isFree = req.body.isFree
        // const isSolve = req.body.isSolve

        console.log('post- formidable')

        const {
            filename: image,
            fields,
            

        } = await formParse(req)

        console.log('image', image)
        console.log({ fields })
        console.log("req session id", req.session.id)
        let { type, name, description, location, happenedAt, categoryId, isFree, fromSocketId} = fields;

        // console.log("result" + isLostOrFound, itemName, description, location, happenedAt, category, isFree, isSolve)

        let result = await client.query(
            'INSERT INTO items (image, type,name,description,location,category_id,is_free,created_by,happened_at) values ($1,$2,$3,$4,$5,$6,$7, $8, NOW()) RETURNING ID',
            [image || 'demoImg.png', type, name, description, location, categoryId, Boolean(isFree), req.session['user'].id]
        )

        let newItemId = result.rows[0].id
        // await client.query(/*sql*/` INSERT INTO item_images (item_id, images) VALUES ($1,$2) `,
        //     [
        //         newItemId, image
        //     ]);
        console.log("newItemId", newItemId)
        
        io.emit('new-item', {
            fromSocketId,
            items: {
                type,
                name,
                description,
                location,
                happenedAt,
                categoryId,
                isFree,
                newItemId,
                image,
                id: newItemId

            }
        })
        return res.json({
            message: 'Upload successful'
        })
    } catch (e) {
        console.log(e)
        return res.status(400).send('Upload Fail')

    }
}

//itemsRoutes.post('/message', /*isLoggedin,*/ async (req, res) => {
//    try {
//        console.log('hi')
//
//        const receiver_id = 2
//        const sender_id = 1
//        const item_id = 65
//        const messageInput = req.body.text
//        await client.query(`INSERT INTO NOTIFICATIONS (receiver_id, sender_id, item_id, CONTENT) VALUES ($1, $2, $3, $4) RETURNING ID`,
//            [receiver_id, sender_id, item_id, messageInput])
//        res.json({
//            message: 'success'
//        })
//        return
//
//    } catch (err: any) {
//        console.log(err.message)
//        logger.error(err.message)
//
//        res.status(400).send('Update error: ' + err.message)
//        return
//    }
//})
//


//'/item-single/:itemId'
async function getItemSingle(req: Request, res: Response) {
    try {
        let itemId = req.params.itemId
        const itemResult = await client.query('select * from items where id = ($1)  ',
            [itemId])
        // console.log(itemResult.rows[0])

        res.json(itemResult.rows[0])
    } catch (err: any) {
        console.log(err.message)
        logger.error(err.message)

        res.status(400).send('Update error: ' + err.message)
        return
    }

}



//'/my-posts'
async function getMyPosts(req: Request, res: Response) {
    try {



        let userId = parseInt(req.session['user']['id'])
        console.log(parseInt(userId + ''))


        const itemResult = await client.query(
            'select * from items where created_by = ($1) and is_deleted = false  ORDER BY created_at DESC',
            [userId])
        res.json(itemResult.rows)
    }
    catch (err: any) {
        console.log(err.message)
        logger.error(err.message)

        res.status(400).send('Update error: ' + err.message)
        return
    }

}


//'/del-my-posts'
async function deleteMyPosts(req: Request, res: Response) {
    try {
        const index = req.body.index

        if (!index || !Number(index)) {
            res.status(400).json({
                message: 'index is invalid'
            })
            return
        }

        await client.query('update items set is_deleted = true where id = $1', [Number(index)])
        // await client.query('select * from items where is_deleted = false and id = $1', [Number(index)])
        res.json({
            message: 'del success'
        })
    } catch (e) {
        console.log('error : ' + e)
        res.status(500).json({
            message: 'del fail'
        })
    }
}

async function searchItems(req : Request, res :Response){
    let keyword = req.query.keyword
    if (!keyword){
        res.status(400).json({
            message:"Invalid keyword"
        })
        return 
    }
    let result =  await client.query(`select * from items where name ilike $1 or description ilike $1 or location ilike $1`, [keyword])
    console.table(result.rows)
    res.json(result.rows)
}






async function getItemSingle2(req: Request, res: Response) {
    try {
        let itemId = req.params.itemId
        const itemResult = await client.query('select * from items where id = ($1)  ',
            [itemId])
        // console.log(itemResult.rows[0])

        res.json(itemResult.rows[0])
    } catch (err: any) {
        console.log(err.message)
        logger.error(err.message)

        res.status(400).send('Update error: ' + err.message)
        return
    }

}

// //itemNotification
// async function getNewItem(req: Request, res: Response) {
//     try{
//         const result = await client.query('select id from items ORDER BY created_at DESC limit 1')
//         res.json (result.rows[0])
//     }catch (err: any) {
//         console.log(err.message)
//         logger.error(err.message)

//         res.status(400).send('Update error: ' + err.message)
//         return}
// }

