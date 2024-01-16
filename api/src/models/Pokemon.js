const {DataTypes} = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Pokemon',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'pokemons',
      timestamps: false,
    },
  );
};
