const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy


module.exports = (passport) => {
    // google OAuth2
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://${process.env.DOMAIN}:3000/auth/google/callback`,
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
            // Update "user" table later for this scenario
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //   return done(err, user)
            // })
            return done(null, profile)
        }
    ))
}