const { User } = require('../models')
const TokenService = require('./TokenService')
const AuthenticationError = require('../exceptions/AuthencticationError')
const UserDto = require('../dto/UserDto.js')
const bcrypt = require('bcrypt')


class UserService {
    async signUp(username, email, password) {
        try {
            await this.validateRegistrationData(email, username)

            const protectedPassword = await bcrypt.hash(password, 1)

            const newUser = await User.create({
                username,
                email,
                password: protectedPassword
            })

            const userData = new UserDto(newUser.dataValues)
            const tokens = await TokenService.generateTokens({...userData})
            await TokenService.saveRefreshToken(userData.id, tokens.refreshToken)

            return {...userData, ...tokens}
        }
        catch(e) {
            throw e
        }
    }
    
    async logIn(email, password) {
        try {
            const candedat = await User.findOne({
                raw: true,
                where: {
                    email
                }
            })
    
            if (!bcrypt.compareSync(password, candedat.password)) {
                throw AuthenticationError.InvalidPassword()
            }
    
            const userData = new UserDto(candedat)
            const tokens = await TokenService.generateTokens({...userData})
            await TokenService.saveRefreshToken(userData.id, tokens.refreshToken)
    
            return {...userData, ...tokens}
        }
        catch(e) {
            throw e
        }
    }
    
    async logOut(refreshToken) {
        try {
            await TokenService.removeToken(refreshToken)
        }
        catch (e) {
            throw e
        }
    }
    
    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw AuthenticationError.NoRefreshToken()
            }

            const oldToken = await TokenService.findRefreshToken(refreshToken)
            const validatedToken = await TokenService.validateRefreshToken(refreshToken)

            if (!oldToken.refresh_token || !validatedToken) {
                throw AuthenticationError.BadRequest()
            }
            
            const user = await User.findOne({
                raw: true,
                where: {
                    id: oldToken.user_id
                }
            })

            const userData = new UserDto(user)
            const tokens = await TokenService.generateTokens({...userData})
            await TokenService.saveRefreshToken(userData.id, tokens.refreshToken)

            return {...userData, ...tokens}
        }
        catch (e) {
            throw e
        }
    }
    
    async validateRegistrationData(email, username) {
        const emailExists = await User.findOne({
            raw: true,
            where: {
                email
            }
        })

        if (emailExists) {
            throw AuthenticationError.EmailExists()
        }
    
        const usernameExists = await User.findOne({
            raw: true,
            where: {
                username
            }
        })

        if (usernameExists) {
            throw AuthenticationError.UsernameExists()
        }
    }

    async getUsers() {
        try {
            const users = await User.findAll({
                raw: true
            })

            return users
        }
        catch (e) {
            throw e
        }
    }
}


module.exports = new UserService()
