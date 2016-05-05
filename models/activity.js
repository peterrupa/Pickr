
export default function (sequelize, DataTypes) {
    let Activity = sequelize.define("Activity", {
        activityName: DataTypes.STRING,
        activityDesc: DataTypes.STRING(1000)
    }, {
        classMethods: {
        		associate(models) {
                Activity.hasMany(models.Note);
            },
            addActivity(data) {
                return Activity.create({
                    activityName: data.activityName,
                    activityDesc: data.activityDesc,
                }).then((activity) => {
                    return activity;
                });
            }
        }, instanceMethods: {
        		createNewNote(data) {
                return this.createNote({
                    ActivityId: data.ActivityId,
                    note: data.note
                });
            },
        }
    });

    return Activity;
};
