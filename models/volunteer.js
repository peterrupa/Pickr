export default function (sequelize, DataTypes) {
    let Volunteer = sequelize.define("Volunteer", {
        volunteerID: 
            { 
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
		activityID: DataTypes.STRING,
		studentID: DataTypes.STRING,
        classCode: DataTypes.STRING,
		dateVolunteered: DataTypes.DATE,
		note: DataTypes.STRING
    });

    return Volunteer;
};
