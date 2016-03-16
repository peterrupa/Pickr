export default function (sequelize, DataTypes) {
    let Activity = sequelize.define("Activity", {
        activityId: DataTypes.STRING,
        name: DataTypes.STRING,
        desc: DataTypes.STRING(1000)
    });

    return Activity;
};
