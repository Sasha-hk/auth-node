class AuthenticationError extends Error {
    status
    error 
    message 

    constructor(status, message, errors = []) {
        super(message)
        this.status = status,
        this.message = message
        this.error = error
    }

    static EmailExists() {
        return new AuthenticationError(400, 'User with this email already exists!')
    }
    
    static EmailNotExists() {
        return new AuthenticationError(400, 'User with this email not exists!') 
    }

    static AccessError() {
        return new AuthenticationError(401, 'User is not authenticated!')
    }

    static NoRefreshToken() {
        return new AuthenticationError(400, 'Refresh Token does not exists!')
    }

    static InvalidRefreshToken() {
        return new AuthenticationError(401, 'Access token has expired!')
    }

    static BadRequest() {
        return new AuthenticationError(400, 'Bad request!')
    }
        


}

module.exports = AuthenticationErro