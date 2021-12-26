module.exports = (passport) => {
    const AppleStrategy = require('passport-apple');
    passport.use(new AppleStrategy({
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_CLIENT_SECRET,
        callbackURL: `http://${process.env.DOMAIN}:3000/auth/apple/callback`,
        keyID: "",
        privateKeyLocation: "",
        passReqToCallback: true
    }, function(req, accessToken, refreshToken, idToken, profile, cb) {

        console.log(profile)
        console.log(refreshToken, 'refresh')
        console.log(accessToken, 'access')
        cosnole.log(idToken)

        cb(null, idToken);
    }));
}