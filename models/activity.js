import uuid from 'node-uuid';

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
                // generate uuid
                let id = uuid.v4();

                return Activity.create({
                    id: id,
                    activityName: data.activityName,
                    activityDesc: data.activityDesc,
                }).then((activity) => {
                    return activity;
                });
            }
        }, instanceMethods: {
        		bindNotes() {
							let promises = activities.map((activity) => {
								return activity.getNotes().then((data) => {
									activity.dataValues.notes = data.map((note) => note.dataValues.note);
									return activity.dataValues;
								});
							}); 
							return Promise.all(promises);
        		},
        		createNewNote(data) {
                let id = uuid.v4();

                return this.createNote({
                    id: id,
                    ActivityId: data.ActivityId,
                    note: data.note
                });
            },
        }
    });

    return Activity;
};
