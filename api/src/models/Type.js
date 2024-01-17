const {DataTypes} = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Type',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tableName: 'types',
      timestamps: false,
    },
  );
};
