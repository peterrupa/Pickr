export default function (sequelize, DataTypes) {
    let Student = sequelize.define("Student", {
        fname: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false 
        },
       	mname: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        image: DataTypes.STRING
    }, {
        classMethods: {
            associate(models) {
                Student.hasMany(models.Tag);
            }
        },
        instanceMethods: {
            addTag(tag) {
                return this.createTag({
                    name: tag
                });
            }
        }
    });

    return Student;
};
