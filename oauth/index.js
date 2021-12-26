const passport = require('passport')

// OAuth providers
const googleOAuth = require('./google-oauth2')
const appleAuth = require('./apple-auth')


googleOAuth(passport)
// appleAuth(passport)


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})