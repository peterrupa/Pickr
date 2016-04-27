export default function (sequelize, DataTypes) {
    let Volunteer = sequelize.define("Volunteer", {
        volunteerID:
            {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
    }, {
      classMethods: {
          associate(models) {
              Volunteer.belongsTo(models.Student);
              Volunteer.belongsTo(models.Class);
              Volunteer.belongsTo(models.Activity);
          }
      },
    });

    return Volunteer;
};
