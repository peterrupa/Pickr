export default function (sequelize, DataTypes) {
    let Volunteer = sequelize.define("Volunteer", {
		activityID: DataTypes.STRING,
		studentID: DataTypes.STRING,
		dateVolunteered: DataTypes.DATE,
		note: DataTypes.STRING
    });

    return Volunteer;
};