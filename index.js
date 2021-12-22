require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connect = require('./models/connect')

const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routes


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
