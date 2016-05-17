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
            }, 
            updateStudent(data) {
                return this.updateAttributes({
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

    return Student;
};
