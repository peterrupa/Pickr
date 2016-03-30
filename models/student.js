import { Tag } from '../models';

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
        }
    });

    return Student;
};
