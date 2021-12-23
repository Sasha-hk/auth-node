const UserService = require('../services/UserService')


class AuthenticationController {
    async signUp(req, res, next) {
        try {
            const {username, email, password} = req.body
            const userData = await UserService.signUp(username, email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, { maxAge: 30 * 1000, httpOnly: false})

            delete userData.refreshToken

            res.json(userData)
        }
        catch(e) {
            const s = e.status || '500'
            res.status(s).json(e)
        }
    }

    async logIn(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await UserService.logIn(email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, { maxAge: 30 * 1000, httpOnly: false})

            delete userData.refreshToken

            res.json(userData)
        }
        catch (e) {
            console.log(e)
            const s = e.status || '500'
            res.status(s).json(e)
        }
    }

    async logOut(req, res, next) {

    }

    async refresh(req, res, next) {

    }
}


module.exports = new AuthenticationController
