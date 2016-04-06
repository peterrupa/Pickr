import { Class } from '../models';

export default function (sequelize, DataTypes) {
    let Activity = sequelize.define("Activity", {
        activityName: DataTypes.STRING,
        activityDesc: DataTypes.STRING(1000)
    }, {
    classMethods: {
		  associate(models) {
		      Activity.belongsTo(models.Class, {foreignKey:'classCode'}); 
		  }
		}
	});
    return Activity;
};
