export default function (sequelize, DataTypes) {
		let Class =sequelize.import(__dirname + "/class");
		
    let Student = sequelize.define("Student", {
      studentId: {
      	type: DataTypes.STRING,
      	primaryKey: true
      },
      studentFName: DataTypes.STRING,
      studentLName: DataTypes.STRING
    });
    
    let Tags = sequelize.define("Tags", {
    	tagName: DataTypes.STRING
    });
    
    Student.belongsTo(Class, {foreignKey:'classCode'});
    Student.hasMany(Tags);
    return Student;
};
