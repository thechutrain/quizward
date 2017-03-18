module.exports = function(sequelize, DataTypes) {
  var UserQuiz = sequelize.define('UserQuiz',
      // column names
      {
        score: {
          type: DataTypes.DECIMAL(5, 2),
        },
        userAnswers: {
          type: DataTypes.JSON,
        }
      },
      // options
      {
        underscored: true,
        freezeTableName: true,
        classMethods:  {
          associate: function(models) {
            UserQuiz.belongsTo(models.Quiz, {
              foreignKey: {
                allowNull: false
              }
            })
            UserQuiz.belongsTo(models.User, {
              foreignKey: {
                allowNull: true,
              }
            })
          }
        }
      }) // end of define
  return UserQuiz;
};