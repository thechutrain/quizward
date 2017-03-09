module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category',
      // columns
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        }
      },
      // options
      {
        underscored: true,
        freezeTableName: true,
        classMethods: {
          associate: function(models) {
            Category.belongsToMany(models.User, { through: 'UserCategory', foreignKey: 'category_id' });
            Category.belongsToMany(models.Quiz, { through: 'QuizCategory', foreignKey: 'category_id' });
            // Quiz.hasMany(models.Question);
          }
        } // end classMethods
      }
    ) // end .define
  return Category;
}