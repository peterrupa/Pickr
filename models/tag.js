export default function (sequelize, DataTypes) {
    let Tag = sequelize.define("Tag", {
		name: DataTypes.STRING
    });

    return Tag;
};
