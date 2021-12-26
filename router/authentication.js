const Router = require('express')
const passport = require('passport')
const AuthenticationController = require('../controllers/AuthenticationController')
const {checkAuth} = require('../middlewares/AuthMiddleware')

const router = new Router()

// custom JWT authentication
router.post('/sign-up', AuthenticationController.signUp)
router.post('/log-in', AuthenticationController.logIn)

router.get('/log-out', AuthenticationController.logOut)

router.get('/refresh', AuthenticationController.refresh)
router.get(
    '/users',
    checkAuth,
    AuthenticationController.getUsers
)


// google OAuth2
router.get('/google', 
    passport.authenticate('google', {
        scope: [
            'email',
            'profile',
            // 'user.phonenumbers'
        ]
    })
)
router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/'
    })
)

// apple auth
router.get("/apple/login", passport.authenticate('apple'));
router.post("/apple/auth", function(req, res, next) {
    passport.authenticate('apple', function(err, user, info) {
        if (err) {
            if (err == "AuthorizationError") {
                res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
                <a href=\"/login\">Sign in with Apple</a>");
            } else if (err == "TokenError") {
                res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
                <a href=\"/login\">Sign in with Apple</a>");
            }
        } else {
            res.json(user);
        }
    })(req, res, next);
});


module.exports = router
