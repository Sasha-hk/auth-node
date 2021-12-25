const TokenService = require('../services/TokenService')
const AuthenticationError = require('../exceptions/AuthencticationError')


async function checkAuth(req, res, next) {
    try {
        const {accessToken} = req.cookies

        const validatedToken = await TokenService.validateAccessToken(accessToken)

        // if (!validatedToken && !req.user) {
        //     throw AuthenticationError.UnAuthorized()
        // }
        
        next()
    }
    catch (e) {
        const s = e.status || '500'
        res.status(s).json(e)
    }
}

function googleAuth(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

module.exports = {
    checkAuth,
    googleAuth
}