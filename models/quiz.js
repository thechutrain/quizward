module.exports = function(sequelize, DataTypes) {
  var Quiz = sequelize.define('Quiz',
      // columns
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        made_by: {
          type: DataTypes.INTEGER,
          // ??? WAY TO LINK AS A FOREIGN KEY TO USER ???
        }
      },
      // options
      {
        underscored: true,
        freezeTableName: true,
        classMethods: {
          associate: function(models) {
            Quiz.belongsToMany(models.User, { through: 'UserQuiz', foreignKey: 'quiz_id' });
            // Quiz.belongsToMany(models.User, { through: 'Comment', foreignKey: 'quiz_id' });
            Quiz.belongsToMany(models.Category, { through: 'QuizCategory', foreignKey: 'quiz_id' });
            Quiz.hasMany(models.Post);
          }
        } // end classMethods
      }
    ) // end .define
  return Quiz;
}