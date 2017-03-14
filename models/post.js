module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  },
    {
      // don't use camelcase for automatically added attributes but underscore style
      underscored: true,
      // disable the modification of table names
      freezeTableName: true,
      classMethods: {
        associate: function(models) {
          // a Quiz (foreignKey) is required or a Post can't be made
          Post.belongsTo(models.Quiz, {
            foreignKey: {
              allowNull: false
            }
          })
          // a User (foreignKey) is required or a Post can't be made
          Post.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          })
        }
      }
    }
  );
  return Post;
};