module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote',
      // column names
      {
        highScore: {
          type: DataTypes.DECIMAL(5, 2),
        },
        userAnswers: {
          type: DataTypes.JSON,
        },
        stars: {
          type: DataTypes.INTEGER,
          defaultValue: -1,
          validate: {
            min: -1,
            max: 5,
          }
        },
        likes: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          validate: {
            min: -1,
            max: 1,
          }
        }
      },
      // options
      {
        underscored: true,
        freezeTableName: true,
      }) // end of define
  return Vote;
};