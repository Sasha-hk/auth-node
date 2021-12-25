const fs = require('fs')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy
const {User} = require('../models')
const request = require('request')


module.exports = (passport) => {
    // google OAuth2
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://${process.env.DOMAIN}:3000/auth/google/callback`,
            passReqToCallback: true
        },
        async function(req, accessToken, refreshToken, profile, done) {
            const pictureUrl = profile._json.picture || null
            const email = profile._json.email || null
            const given_name = profile._json.given_name || null
            const family_name = profile._json.family_name || null

            const picture = pictureUrl ? request(pictureUrl) : null

            const existingUser = await User.findOne({
                raw: true,
                where: {
                    email
                },
            })
            
            if (existingUser) {
                const updateUser = await User.update(
                    {
                        email,
                        picture,
                        given_name,
                        family_name,
                    },
                    {
                        raw: true,
                        where: {
                            email
                        }
                    }
                )
            }
            else {
                const newUser = await User.create({
                    email,
                    picture,
                    given_name,
                    family_name 
                })
            }

            

            return done(null, profile)
        }
    ))
}