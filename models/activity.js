export default function (sequelize, DataTypes) {
    let Activity = sequelize.define("Activity", {
        activityName: DataTypes.STRING,
        activityDesc: DataTypes.STRING(1000)
    }, {
        classMethods: {
            addActivity(data) {
                return Activity.create({
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