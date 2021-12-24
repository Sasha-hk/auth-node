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
        catch (e) {
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
        try {
            const {refreshToken} = req.cookies

            if (req.user) {
                req.logout()
                return res.sendStatus(200)
            }

            await UserService.logOut(refreshToken)

            res.clearCookie('refreshToken')
            res.clearCookie('accessToken')

            res.json('Ok')
        }
        catch (e) {
            const s = e.status || '500'
            res.status(s).json(e)
        }
    }

    async refresh(req, res, next) {        
        try {
            const {refreshToken} = req.cookies

            const userData = await UserService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
            res.cookie('accessToken', userData.accessToken, {maxAge: 30 * 1000, httpOnly: false})

            delete userData.refreshToken

            res.json(userData)
        }
        catch (e) {
            const s = e.status || '500'
            res.status(s).json(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers()

            res.json(users)
        }
        catch (e) {
            const s = e.status || '500'
            res.status(s).json(e)
        }
    }
}


module.exports = new AuthenticationController
