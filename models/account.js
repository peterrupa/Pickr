import uuid from 'node-uuid';

export default function (sequelize, DataTypes) {
    let Account = sequelize.define("Account", {
        Fname: DataTypes.STRING,
        MI: DataTypes.STRING,
        Lname: DataTypes.STRING,
        Username: DataTypes.STRING,
        EmailAddress: DataTypes.STRING,
        Password: DataTypes.STRING
    }, {
        classMethods: {
            associate(models) {
                Account.hasMany(models.Class);
            }
        },
        instanceMethods: {
            createNewClass(data) {
                let id = uuid.v4();
                
                return this.createClass({
                    classCode: id,
                    className: data.className,
                    classDesc: data.classDesc
                });
            }
        }
    });
    
    return Account;
};
