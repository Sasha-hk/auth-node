const UserService = require('../services/UserService')


class AuthenticationController {
    async signUp(req, res, next) {
        try {
            const {username, email, password} = req.body
            const userData = await UserService.signUp(username, email, password)

            res.json(userData)
        }
        catch(e) {
            const s = e.status || '500'
            res.status(s).json(e)
        }
    }

    async logIn(req, res, next) {

    }

    async logOut(req, res, next) {

    }

    async refresh(req, res, next) {

    }
}


module.exports = new AuthenticationController
