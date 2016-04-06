export default function (sequelize, DataTypes) {
    let Class = sequelize.define("Class", {
        classCode: DataTypes.STRING,
        className: DataTypes.STRING,
        classSection: DataTypes.STRING(1000)
    });
    return Class;
};
