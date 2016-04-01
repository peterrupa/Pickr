import uuid from 'node-uuid';

export default function (sequelize, DataTypes) {
    let Activity = sequelize.define("Activity", {
        activityId: {
        	type: DataTypes.STRING,
        	primaryKey: true
        },
        activityName: DataTypes.STRING,
        activityDesc: DataTypes.STRING(1000)
    }, {
        classMethods: {
            addActivity(data) {
                // generate uuid
                let id = uuid.v4();
                
                return Activity.create({
                    activityId: id,
                    activityName: data.activityName,
                    activityDesc: data.activityDesc,
                });
            }
        }
    });

    return Activity;
};
