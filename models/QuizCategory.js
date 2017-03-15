module.exports = function(sequelize, DataTypes) {
  var QuizCategory = sequelize.define("QuizCategory", 
  {},
  {
    // don't use camelcase for automatically added attributes but underscore style
    underscored: true,
    // disable the modification of table names
    freezeTableName: true,
  }
  );
  return QuizCategory;
};