import uuid from 'node-uuid';

export default function (sequelize, DataTypes) {
    let Activity = sequelize.define("Activity", {
        activityName: DataTypes.STRING,
        activityDesc: DataTypes.STRING(1000)
    }, {
        classMethods: {
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
        }
    });

    return Activity;
};