const Router = require('express')
const AuthenticationController = require('../controllers/AuthenticationController')

const router = new Router()

router.post('/sign-up', AuthenticationController.signUp)
router.post('/log-in', AuthenticationController.logIn)

router.delete('/log-out', AuthenticationController.logOut)

router.get('/refresh', AuthenticationController.refresh)
// router.get('/users', )

module.exports = router
