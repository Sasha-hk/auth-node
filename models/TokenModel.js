module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(
        'Token',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            refresh_token: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'tokens',
            freezeTableName: true,
            timestamp: false,
            createdAt: false,
            updatedAt: false,
        }
    )
 
    Token.associate = function(models) {
        Token.belongsTo(models.User, {
            foreignKey: 'user_id'
        })
    }

    return Token
}