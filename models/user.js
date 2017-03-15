// var bcrypt = require('bcryptjs');

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
      // instanceMethods: {
      //   validPassword: function(password) {
      //     return bcrypt.compareSync(password, this.password);
      //   }
      // },
      // hooks: {
      //   beforeCreate: function(user, options, cb) {
      //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      //     cb(null, options);
      //   }
      // }
      classMethods: {
        associate: function(models) {
          User.belongsToMany(models.Quiz, { through: 'UserQuiz', foreignKey: 'user_id' });
          // User.belongsToMany(models.Quiz, { through: 'Comment', foreignKey: 'user_id' });
          User.belongsToMany(models.Category, { through: 'UserCategory', foreignKey: 'user_id' });
          User.hasMany(models.Post);
        }
      } // end classMethods
    }); // end .define
  return User;
};