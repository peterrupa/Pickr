export default function (sequelize, DataTypes) {
    let User = sequelize.define("User", {
        login:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return User;
};