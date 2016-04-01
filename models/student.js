import uuid from 'node-uuid';
import { Tag, Class } from '../models';

export default function (sequelize, DataTypes) {
    let Student = sequelize.define("Student", {
        studentId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        fname: DataTypes.STRING,	//first name
        lname: DataTypes.STRING,	//last name
       	mname: DataTypes.STRING,	//middle initial
        image: DataTypes.STRING
    }, {
        classMethods: {
            associate(models) {
                Student.hasMany(models.Tag);
                Student.belongsTo(models.Class, {
                    foreignKey: 'classCode'
                });
            },
            addStudent(data) {
                // generate uuid
                let id = uuid.v4();
                
                return Student.create({
                    studentId: id,
                    fname: data.fname,
                    lname: data.lname,
                    mname: data.mname,
                    image: data.image
                })
                .then((student) => {
                    // create tags
                    let tags = data.tags.map((tag) => student.createTag({
                        name: tag
                    }));
                    
                    return Promise.all(tags).then((tagsResult) => {
                        student.dataValues.tags = tagsResult.map((tag) => tag.name);
                        
                        return student;
                    });
                });
            }
        }
    });

    return Student;
};