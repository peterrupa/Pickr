export default function (sequelize, DataTypes) {
    let Account = sequelize.define("Account", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            unique: true
        },
        tokenExpiry: DataTypes.DATE,
    }, {
        classMethods: {
            associate(models) {
                Account.hasMany(models.Class);
            }
        },
        instanceMethods: {
            createNewClass(data) {
                return this.createClass({
                    className: data.className,
                    classCode: data.classCode
                });
            }
        }
    });

    return Account;
};
