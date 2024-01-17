require('dotenv').config();
const {DB_CONN_STRING} = require('./env.config');
const {Sequelize} = require('sequelize');
const PokemonModel = require('../models/Pokemon');
const TypeModel = require('../models/Type');
const AbilityModel = require('../models/Ability');
const MoveModel = require('../models/Move');

let dialectOptionsByEnv = {};

if (process.env.TEST_MODE === 'development' || process.argv[2] === 'development') {
  dialectOptionsByEnv = {};
} else if (process.argv[2] === 'production') {
  dialectOptionsByEnv = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(DB_CONN_STRING, {
  logging: console.log('Connected to DB...'),
  native: false,
  dialectOptions: dialectOptionsByEnv,
});

PokemonModel(sequelize);
TypeModel(sequelize);
AbilityModel(sequelize);
MoveModel(sequelize);

const {Pokemon, Type, Ability, Move} = sequelize.models;

Pokemon.belongsToMany(Type, {through: 'pokemon_type'});
Type.belongsToMany(Pokemon, {through: 'pokemon_type'});

Pokemon.belongsToMany(Ability, {through: 'pokemon_ability'});
Ability.belongsToMany(Pokemon, {through: 'pokemon_ability'});

Pokemon.belongsToMany(Move, {through: 'pokemon_move'});
Move.belongsToMany(Pokemon, {through: 'pokemon_move'});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
