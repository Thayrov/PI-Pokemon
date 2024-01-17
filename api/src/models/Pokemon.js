const {DataTypes} = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'Pokemon',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      hp: DataTypes.INTEGER,
      attack: DataTypes.INTEGER,
      special_attack: DataTypes.INTEGER,
      defense: DataTypes.INTEGER,
      special_defense: DataTypes.INTEGER,
      speed: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
    },
    {
      tableName: 'pokemons',
      timestamps: false,
    },
  );
};
