const TokenService = require('../services/TokenService')
const AuthenticationError = require('../exceptions/AuthencticationError')


async function checkAuth(req, res, next) {
    try {
        const {accessToken} = req.cookies

        const validatedToken = await TokenService.validateAccessToken(accessToken)

        // if (!validatedToken) {
        //     next(AuthenticationError.UnAuthorized())
        // }
        
        next()
    }
    catch (e) {
        return next(e)
    }
}

function googleAuth(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

module.exports = {
    checkAuth,
    googleAuth
}