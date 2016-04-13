export default function (sequelize, DataTypes) {
    let Activity = sequelize.define("Activity", {
        activityId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        activityName: DataTypes.STRING,
        activityDesc: DataTypes.STRING(1000)
    });

    return Activity;
};