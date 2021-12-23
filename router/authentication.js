const Router = require('express')
const AuthenticationController = require('../controllers/AuthenticationController')

const router = new Router()

router.post('/sign-up', AuthenticationController.signUp)
router.post('/log-in', AuthenticationController.logIn)
// router.post('/log-out', )

// router.get('/refresh', )
// router.get('/users', )

module.exports = router
