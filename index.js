require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const connect = require('./models/connect')
const authentication = require('./router/authentication')

const {checkAuth, googleAuth} = require('./middlewares/AuthMiddleware')

require('./oauth')


const PORT = process.env.PORT || 3000
const app = express()


// middlewares
app.use(session({ 
    secret: 'cats',
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routes
app.use('/auth', authentication)

app.get('/', (req, res, next) => {
    res.send('<a href="/auth/google">Log-in with Google</a> <a href="/auth/apple/login">Log-in with apple</a>')
})

app.get('/protected',
    googleAuth,
    (req, res, next) => {
        res.send('Authorized!')
    }
)


const start = async () => {
    try {
        await connect(() => {
            console.log(`Connected to database`)
        })

        app.listen(PORT, () => {
            console.log(`Server started...`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start()
