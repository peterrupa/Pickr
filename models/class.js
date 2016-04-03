import uuid from 'node-uuid';

export default function (sequelize, DataTypes) {
    let Class = sequelize.define("Class", {
        classCode: {
        	type: DataTypes.STRING,
        	primaryKey: true
        },
        className: DataTypes.STRING,
        classDesc: DataTypes.STRING(1000)
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
                    classCode: id,
                    className: data.className,
                    classDesc: data.classDesc
                })
                .then((classData) => {
                    return classData;
                });
            }
        }
    });
    
    return Class;
};
