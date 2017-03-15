module.exports = function(sequelize, DataTypes) {
  var Avatar = sequelize.define('Avatar',
    // column names
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /.(svg)$/, // only accept svg files
        }
      },
      level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 7,
        }
      }
    },
    // options
    {
      underscored: true,
      freezeTableName: true,
    }) // end of define
  return Avatar;
};