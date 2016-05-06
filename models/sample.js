export default function (sequelize, DataTypes) {
    let Sample = sequelize.define("Sample", {
        title: DataTypes.STRING
    });

    return Sample;
};


