import uuid from 'node-uuid';

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
            },
            createStudent(data) {
                // generate uuid
                let id = uuid.v4();

                return Student.create({
                    id:id,
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
