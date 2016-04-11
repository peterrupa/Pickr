export default function (sequelize, DataTypes) {
    let Account = sequelize.define("Account", {
        fname: DataTypes.STRING,
        mi: DataTypes.STRING,
        lname: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            validate: {
                notNull: true
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            validate: {
                notNull: true
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notNull: true
            }
        }
    });
    return Account;
};
