const {DataTypes} = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Move',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: 'moves',
      timestamps: false,
    },
  );
};
