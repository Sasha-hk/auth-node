const passport = require('passport')

// OAuth providers
const googleOAuth = require('./google-oauth2')


googleOAuth(passport)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})