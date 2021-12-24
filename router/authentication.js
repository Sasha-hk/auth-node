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
            'profile'
        ]
    })
)



router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/'
    })
)


module.exports = router
