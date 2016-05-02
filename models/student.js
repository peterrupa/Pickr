export default function (sequelize, DataTypes) {
    let Student = sequelize.define("Student", {
        fname: DataTypes.STRING,	//first name
        lname: DataTypes.STRING,	//last name
       	mname: DataTypes.STRING,	//middle initial
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
