module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        name : {
            type : DataTypes.STRING,
            allownull: false
        },
        email: {
            type : DataTypes.STRING,
            allownull : false
        },
        password: {
            type : DataTypes.STRING,
            allownull : false
        },
        contact: {
            type: DataTypes.INTEGER,
            allownull: false
        }
    });
    return user;
}