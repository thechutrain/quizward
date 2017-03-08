module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User',
    // columns of table
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      img_url: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATEONLY,
      }
    },
    // options
    {
      underscored: true,
      freezeTableName: true,
      classMethods: {
        associate: function(models) {
          User.belongsToMany(models.Quiz, { through: 'UserQuiz', foreignKey: 'user_id' })
        }
      } // end classMethods
    }); // end .define
  return User;
};