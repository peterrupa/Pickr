module.exports = function(sequelize, DataTypes) {
  var Sample = sequelize.define("Sample", {
    title: DataTypes.STRING
  });

  return Sample;
};