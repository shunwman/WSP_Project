import express from 'express'
import { userRoutes } from './route/userRoute'
import { sessionMiddleware } from './utils/middleware'
import grant from 'grant';
import { env } from './utils/env'
import { itemsRoutes } from './routes/itemRoute';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import { setIO } from './utils/setIO';
const app = express()
const server = new http.Server(app);
const io = new SocketIO(server);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware)

io.on('connection', function(socket){console.log('hi socket', socket.id)})
declare module 'express-session' {
    interface SessionData {
        name?: string
        isloggedin?: boolean
        whoProfileUser?: string
    }
}
const grantExpress = grant.express({
    "defaults": {
        "origin": "http://localhost:8080",
        "transport": "session",
        "state": true,
    },
    "google": {
        "key": env.GOOGLE_CLIENT_ID || "",
        "secret": env.GOOGLE_CLIENT_SECRET || "",
        "scope": ["profile", "email"],
        "callback": "/user/login/google"
    }
});

app.use(grantExpress as express.RequestHandler);

app.use('/user', userRoutes)
app.use('/items', itemsRoutes)

// app.use(express.static('test_ui'))
// app.use(express.static('public')) // auto to do next()

app.use(express.static('googlemap'))
app.use(express.static('uploads'))
app.use(express.static('public/assets/img'))

app.use(express.static('public'))

app.use((req, res) => {
    res.redirect("/404.html");
});
setIO(io)
server.listen(8080, () => {
    // fs.mkdirSync(uploadDir, { recursive: true })
    console.log('Listening on port 8080')
})