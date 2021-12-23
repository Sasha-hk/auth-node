const { Token }= require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'})

        return {accessToken, refreshToken}
    }

    async saveRefreshToken(user_id, refresh_token) {
        const candedat = await Token.findOne({
            raw: true,
            where: {
                user_id
            }
        })

        if (candedat) {
            const updateOldToken = await Token.update(
                {
                    refresh_token
                },
                {
                    where: {
                        user_id
                    }
                }
            )
            return updateOldToken.dataValues
        }
        
        const newRefreshToken = await Token.create({
            user_id,
            refresh_token
        })

        return newRefreshToken
    }

    async findRefreshToken(refresh_token) {
        const found = await TokenModel.findOne({
            raw: true,
            where: {
                refresh_token
            }
        })

        return found
    }
    
    async removeToken(refresh_token) {
        Token.destroy({
            raw: true,
            where: {
                refresh_token
            }
        })
    }

    async validateAccessToken(accessToken) {
        const validated = jwt.verify(accessToken)

        return validated
    }

    async validateRefreshToken(refreshToken) {
        const validated = jwt.verify(refreshToken)

        return validated
    }
}


module.exports = new TokenService()
