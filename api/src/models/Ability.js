const {DataTypes} = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Ability',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: 'abilities',
      timestamps: false,
    },
  );
};
