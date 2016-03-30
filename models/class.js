export default function (sequelize, DataTypes) {
    let Class = sequelize.define("Class", {
        classCode: {
        	type: DataTypes.STRING,
        	primaryKey: true
        },
        className: DataTypes.STRING,
        classDesc: DataTypes.STRING(1000)
    });
    return Class;
};
