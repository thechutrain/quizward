module.exports = function(sequelize, DataTypes) {
  var UserQuiz = sequelize.define('UserQuiz',
  // column names
  {
    score: {
      type: DataTypes.DECIMAL(5,2),
    }
  },
  // options
  {
    underscored: true,
    freezeTableName: true,
  }) // end of define
  return UserQuiz;
};