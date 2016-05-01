import uuid from 'node-uuid';

export default function (sequelize, DataTypes) {
    let Class = sequelize.define("Class", {
        classCode: DataTypes.STRING,
        className: DataTypes.STRING(1000)
    }, {
            classMethods: {
                associate(models) {
                    Class.hasMany(models.Activity);
                    Class.hasMany(models.Student);
                },
                addClass(data) {
                    // generate uuid
                    let id = uuid.v4();

                    return Class.create({
                        id: id,
                        className: data.className,
                        classCode: data.classCode
                    })
                        .then((classData) => {
                            return classData;
                        });
                }
            },
            instanceMethods: {
                createNewActivity(data) {
                    let id = uuid.v4();

                    return this.createActivity({
                        id: id,
                        ClassId: data.ClassId,
                        activityName: data.activityName,
                        activityDesc: data.activityDesc
                    });
                },
                createNewStudent(data) {
                    return this.createStudent({
                        fname: data.fname,
                        lname: data.lname,
                        mname: data.mname,
                        image: data.image
                    }).then((student) => {
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

    return Class;
};
