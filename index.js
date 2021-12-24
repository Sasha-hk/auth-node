require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connect = require('./models/connect')
const authentication = require('./router/authentication')
const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy

const PORT = process.env.PORT || 3000
const app = express()


// google OAuth2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://yourdomain:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user)
    })
  }
))

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// routes
app.use('/auth', authentication)


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



