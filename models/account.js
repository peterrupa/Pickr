export default function (sequelize, DataTypes) {
    let Account = sequelize.define("Account", {
        fname: DataTypes.STRING,
        mi: DataTypes.STRING,
        lname: DataTypes.STRING,
        username: DataTypes.STRING,
        emailAddress: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Account;
};
