module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            username: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
            },
            picture: {
                type: DataTypes.BLOB,
            },
            given_name: {
                type: DataTypes.STRING(100),
            },
            family_name: {
                type: DataTypes.STRING,
            }
        },
        {
            tableName: 'users',
            freezeTableName: true,
            timestamp: false,
            createdAt: false,
            updatedAt: false,
        }
    )

    return User
}