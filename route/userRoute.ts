import express, { Request, Response } from 'express'
import { client } from '../utils/db'
import { formParseBetter } from '../utils/upload'
import { checkPassword, hashPassword } from '../utils/hash'
import fetch from 'cross-fetch'
import crypto from 'crypto'

//import { logger } from '../utils/logger'

export const userRoutes = express.Router()
userRoutes.get('/me', getMe)
userRoutes.put('/notifi', sendNotification)
userRoutes.post('/login', login)
userRoutes.post('/register', register)
userRoutes.get('/user/:id', getUser)
userRoutes.get('/logout', logout)
userRoutes.get('/login/google', loginGoogle)
userRoutes.post('/notifications', getNotifications)
userRoutes.get('/testNotifi', sendTestNotifi)
userRoutes.get('/profile', getProfile)
userRoutes.post('/profile/other', getOtherProfile)
userRoutes.post('/profile/formidable', editProfile)
userRoutes.post('/profile/items/formidable', editSingleItem)

interface googleUserProfile {
	email: string
	name: string
	picture: string
}
interface dataForProfile {
	id: number
	username: string
	living_address: string
	working_address: string
	phone_number: number
	email: string
	image: string
	created_at: string
}

async function editSingleItem(req: Request, res: Response) {
	try {
		console.log('userRoute- [formidableItems]')
		const {
			filename: image,
			fields

		} = await formParseBetter(req)
		//console.log(fields)
		let { name: name,
			category_id: category_id,
			description: description,
			location: location,
			happened_at: happened_at,
			status: status,
			isFree: isFree,
			id: id,
		} = fields
		
		let result = await client.query(
			'UPDATE items SET name = $1 WHERE id = $2',
			[name, id]
		)
		result = await client.query(
			'UPDATE items SET category_id = $1 WHERE id = $2',
			[category_id, id]
		)
		result = await client.query(
			'UPDATE items SET description = $1 WHERE id = $2',
			[description, id]
		)
		result = await client.query(
			'UPDATE items SET location = $1 WHERE id = $2',
			[location, id]
		)
		result = await client.query(
			'UPDATE items SET happened_at = $1 WHERE id = $2',
			[happened_at, id]
		)
		result = await client.query(
			'UPDATE items SET status = $1 WHERE id = $2',
			[status, id]
		)
		result = await client.query(
			'UPDATE items SET is_Free = $1 WHERE id = $2',
			[isFree, id]
		)
		result = await client.query(
			'UPDATE items SET image = $1 WHERE id = $2',
			[image, id]
		)
		result = await client.query(
			'SELECT * FROM items WHERE id = $1',
			[id]
		)
		let itemData = result.rows[0]

		console.log(itemData)
		res.status(200).json({
			message: 'Upload successful'
		})
	} catch (e) {
		console.log(e)
		res.status(400).send('Upload Fail')
		return
	}
}


async function editProfile(req: Request, res: Response) {
	try {
		console.log('userRoute- [formidable]')
		const {
			filename: image,
			fields

		} = await formParseBetter(req)
		//console.log(fields)
		let email
		let { username: username,
			living_address: living_address,
			working_address: working_address,
			phone: phone,
		} = fields
		if (!fields.email) {
			email = req.session['email']
		}
		if (fields.email) {
			email = fields.email
		}
		const usersForCheckingName = (
			await client.query(`SELECT * FROM users WHERE username = $1`, [
				username
			])
		).rows
		const usersForCheckingEmail = (
			await client.query(`SELECT * FROM users WHERE email = $1`, [
				email
			])
		).rows
		const usersForCheckingPhone = (
			await client.query(`SELECT * FROM users WHERE phone_number = $1`, [
				parseInt(phone)
			])
		).rows
		console.log("Name check: " + usersForCheckingName)
		console.log("email check: " + usersForCheckingEmail)
		console.log("Phone check: " + usersForCheckingPhone)
		let checkSameToOther: boolean = false
		if (usersForCheckingPhone[0]) {
			if (!(usersForCheckingPhone[0].id === req.session['user']['id'])) {
				checkSameToOther = true
			}
		}
		if (usersForCheckingEmail[0]) {
			if (!(usersForCheckingEmail[0].id === req.session['user']['id'])) {
				checkSameToOther = true
			}
		}
		if (usersForCheckingName[0]) {
			if (!(usersForCheckingName[0].id === req.session['user']['id'])) {
				checkSameToOther = true
			}
		}
		if (checkSameToOther) {
			res.status(400).json({
				message: 'Phone No, email or username have been already existed in the database.'
			})
			return
		}
		let result = await client.query(
			'UPDATE users SET username = $1 WHERE id = $2',
			[username, req.session['user']['id']]
		)
		result = await client.query(
			'UPDATE users SET living_address = $1 WHERE id = $2',
			[living_address, req.session['user']['id']]
		)
		result = await client.query(
			'UPDATE users SET working_address = $1 WHERE id = $2',
			[working_address, req.session['user']['id']]
		)
		result = await client.query(
			'UPDATE users SET phone_number = $1 WHERE id = $2',
			[phone, req.session['user']['id']]
		)
		result = await client.query(
			'UPDATE users SET email = $1 WHERE id = $2',
			[email, req.session['user']['id']]
		)
		result = await client.query(
			'UPDATE users SET image = $1 WHERE id = $2',
			[image, req.session['user']['id']]
		)
		result = await client.query(
			'SELECT * FROM users WHERE id = $1',
			[req.session['user']['id']]
		)
		let userData = result.rows[0]
		let {
			password: dbUserPassword,
			created_at,
			updated_at,
			...filteredUserObj
		} = userData
		//console.log(result)
		req.session['email'] = email
		req.session['name'] = username
		req.session['user'] = filteredUserObj
		console.log(req.session['user'])
		res.json({
			message: 'Upload successful'
		})
	} catch (e) {
		console.log(e)
		res.status(400).send('Upload Fail')
		return
	}
}

async function sendNotification(req: Request, res: Response) {
	console.log('userRoutes - [/sendNotifi]')
	console.log('body=' + req.body)
	console.log('message= ' + req.body.message)
	console.log('id=' + req.body.receiver_id)
	console.log('type=' + req.body.type)
	console.log("item_id=" + req.body.item_id)
	//console.log(req.session['user']['id'])
	let notificationMessage: string = "";
	if (req.session['name'] === undefined) {
		res.status(400).json({
			message: "no user"
		})
		return
	}
	if (req.body.type === "Found" || req.body.type === "found" ) {
		notificationMessage += `User ` + req.session['name'] + `[Request your item]_`+ req.body.message
	}
	if (req.body.type === "Lost" || req.body.type === "lost") {
		notificationMessage += `User ` + req.session['name'] + `[Found your item]_`+ req.body.message
	}
	let userInSql = await client.query(
		`INSERT INTO notifications (receiver_id,sender_id,item_id,content) values ($1,$2,$3,$4)`,
		[parseInt(req.body.receiver_id), parseInt(req.session['user']['id']), parseInt(req.body.item_id), notificationMessage])
	console.log(userInSql)
	res.status(200).json({ message: "sended" })
}

async function getOtherProfile(req: express.Request, res: express.Response) {
	console.log('userRoutes - [/getOtherProfile]')
	console.log("id: " + req.body['sender_id'])
	const senderIdForSearch = parseInt(req.body['sender_id'])
	let userInSql = await client.query(
		`select * from users where id = $1`,
		[senderIdForSearch]
	)
	//console.log(userInSql)
	//console.log(userInSql.rows[0])
	if (!userInSql.rows[0]) {
		res.status(400).json({ message: "fail!!" })
		return
	}
	const userProfile: dataForProfile = userInSql.rows[0]
	//console.log(userProfile)
	res.status(200).json(userProfile)
}

async function getUser(req: express.Request, res: express.Response) {

	let userIdToSearch = req.params.id

	if (!Number(userIdToSearch)) {
		res.status(400).json({
			message: "Invalid user id "
		})
	}
	let result = await client.query(`select 
	email, id, image, phone_number, username
	
	
	from users where id = $1`, [userIdToSearch])

	res.json({
		data: result.rows[0]
	})
}

async function getProfile(req: express.Request, res: express.Response) {
	console.log('userRoutes - [/getProfile]')
	console.log("email: " + req.session['email'])
	const emailForSearch = req.session['email']
	let userInSql = await client.query(
		`select * from users where email = $1`,
		[emailForSearch]
	)
	//console.log(userInSql)
	//console.log(userInSql.rows[0])
	if (!userInSql.rows[0]) {
		res.status(400).json({ message: "fail!!" })
		return
	}
	const userProfile: dataForProfile = userInSql.rows[0]
	//console.log(userProfile)
	res.status(200).json(userProfile)
}

//send the notification to user who is id:3
async function sendTestNotifi(req: Request, res: Response) {
	console.log('userRoutes - [/sendTestNotifi]')
	let userInSql = await client.query(
		`INSERT INTO notifications (receiver_id,sender_id,item_id,content) values (3,3,1,'Testing...')`)
	console.log(userInSql)
	res.json({ message: "sended" })
}

async function getNotifications(req: Request, res: Response) {
	let newNotificationNum = 0
	console.log('userRoutes - [/notification]')
	console.log('getNotifications for user : ', req.session["name"])

	if(!req.session["name"]){
		console.log('no user')
		res.json({ message: "noNotification" })
		return
	}
	const userId = req.session['user']['id']
	console.log('getNotifications for user : ', userId)
	let userInSql = await client.query(
		`select * from users where id = $1`,
		[userId]
	)
	let idInSql = parseInt(userInSql.rows[0].id)
	console.log(idInSql)
	let notificationSQL = (await client.query(
		`select * from notifications where receiver_id = $1 order by created_at DESC`, [idInSql])).rows
	if (!notificationSQL[0]) {
		res.json({ message: "noNotification" })
		return
	}
	
	console.log(notificationSQL)
	let notifiContent: String[] = []
	let notifiSender: String[] = []
	let notifiSenderId: Number[] = []
	let notifiItemId: Number[] = []
	for (let notifi of notificationSQL) {
		
		let notifiCreateAtValue = new Date(notifi.created_at).valueOf()
		let notifiUpdateATValue = new Date(notifi.updated_at).valueOf()
		if (notifiCreateAtValue == notifiUpdateATValue){
			newNotificationNum++
			notifiContent.push(notifi.content)
			notifiItemId.push(notifi.item_id)
		}
	}
	for (let notifi of notificationSQL) {
		let senderSQL = (await client.query(
			`select * from users where id = $1`, [notifi.sender_id])).rows
		notifiSenderId.push(senderSQL[0].id)
		notifiSender.push(senderSQL[0].username)
	}
	console.log(newNotificationNum)
	//console.log(notifiSenderId)
	//console.log(notifiContent)
	//console.log(notifiSender)
	res.json({
		notifiNum: newNotificationNum,
		message: notifiContent,
		sender: notifiSender,
		id: notifiSenderId,
		itemId: notifiItemId,
	})

}
async function login(req: Request, res: Response) {
	console.log('userRoutes - [/login]')
	const email = req.body.email
	const password = req.body.password

	if (!email || !password) {
		res.status(400).json({
			message: 'Invalid email or password'
		})
		return
	}
	
	let userResult = await client.query(
		`select * from users where email = $1`,
		[email]
	)
	let dbUser = userResult.rows[0]
	
	if (!dbUser) {
		res.status(400).json({
			message: 'Invalid email or password'
		})
		return
	}

	// compare password

	let isMatched = await checkPassword(password, dbUser.password)

	if (!isMatched) {
		res.status(400).json({
			message: 'Invalid username or password'
		})
		return
	}

	let {
		password: dbUserPassword,
		created_at,
		updated_at,
		...filteredUserObj
	} = dbUser
	req.session['user'] = filteredUserObj
	req.session['name'] = dbUser['username']
	req.session['email'] = dbUser['email']
	//console.log(req.session['user'])

	res.json({
		message: 'Success login'
	})
}

async function register(req: Request, res: Response) {
	try {
	console.log(req.body)
	const username = req.body.username
	const password = req.body.password
	const email = req.body.email
	const working_address = req.body.working_address
	const phone_number = req.body.phone_number
	const living_address = req.body.living_address
	const image = req.body.image
	const is_admin = req.body.is_admin


	//catch error

	if (!username || !password) {
		res.status(400).json({
			message: 'Invalid username or password'
		})
		return
	}
	//catch duplicate name and email 
	const usersForCheckingName = (
		await client.query(`SELECT * FROM users WHERE username = $1`, [
			username
		])
	).rows
	const usersForCheckingEmail = (
		await client.query(`SELECT * FROM users WHERE email = $1`, [
			email
		])
	).rows
	if (usersForCheckingName[0]){
		res.status(400).json({
			message: 'Invalid username or password'
		})
		return
	}
	if (usersForCheckingEmail[0]){
		res.status(400).json({
			message: 'Invalid username or password'
		})
		return
	}

		
	let hashedPassword = await hashPassword(password)
	await client.query(
		'INSERT INTO users (username,password,living_address,working_address,phone_number,email,is_google,image) values ($1,$2,$3,$4,$5,$6,$7,$8)',
		[username, hashedPassword, living_address, working_address, phone_number, email, is_admin, image]
	)
	console.log("update completed")
	res.json({ message: 'ok' })

	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}

}

function logout(req: Request, res: Response) {
	console.log('userRoutes - [/LOGOUT]')
	req.session.destroy(() => {
		console.log('user logged out')
	})
	res.json({
		message: 'Logout'

	})
}

async function getMe(req: express.Request, res: express.Response) {
	console.log(req.session['name'])
	if (req.session['name'] === undefined) {
		res.status(400).json({
			message: "no user"
		})
		return
	}
	res.status(200).json({
		message: 'Success retrieve user',
		data: {

			user: req.session['name'] ? req.session['name'] : null,
			userData: req.session['user'] ? req.session['user'] : null
		}
	})
}

async function loginGoogle(req: Request, res: Response) {
	const accessToken = req.session?.['grant'].response.access_token;
	const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		method: "get",
		headers: {
			"Authorization": `Bearer ${accessToken}`
		}
	});
	const googleProfile: googleUserProfile = await fetchRes.json();
	const users = (
		await client.query(`SELECT * FROM users WHERE email = $1`, [
			googleProfile.email
		])
	).rows
	//console.log(googleProfile.name)
	let user = users[0]
	if (!user) {
		//get a random 32 bit string
		const randomString = crypto.randomBytes(32).toString('hex')
		let hashedPassword = await hashPassword(randomString)
		// Create the user when the user does not exist
		user = (
			await client.query(
				'INSERT INTO users (username,password,living_address,working_address,phone_number,email,is_google,image) values ($1,$2,$3,$4,$5,$6,$7,$8)',
				[googleProfile.name, hashedPassword, 'noData', 'noData', 0, googleProfile.email, true, googleProfile.picture]
			)
		)
	}else{
		req.session['user'] = user
		req.session['name'] = user.username
		req.session['email'] = user.email
		req.session['isloggedin'] = true
			console.log(user)
			console.log(req.session['isloggedin'])
			console.log(user['username'])
			console.log(req.session['name'])
			res.redirect('/index.html')
			return
	}
	let {
		password: dbUserPassword,
		created_at,
		updated_at,
		...filteredUserObj
	} = user
	// 最後當佢 login 成功處理
	// set google profile 入去 req session
	if (req.session) {
		req.session['user'] = filteredUserObj
		req.session['name'] = googleProfile.name
		req.session['email'] = googleProfile.email
		req.session['isloggedin'] = true
	}

	//console.log(user)
	//console.log(req.session['isloggedin'])
	//console.log(user['username'])
	//console.log(req.session['name'])
	if (user['phone_number'] == "0"){
	res.redirect('/profile.html')
	}else {
	res.redirect('/index.html')
	}

}