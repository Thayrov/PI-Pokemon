require('dotenv').config();
const {DB_CONN_STRING} = require('./env.config');
const {Sequelize} = require('sequelize');
const PokemonModel = require('../models/Pokemon');
const TypeModel = require('../models/Type');

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

const {Pokemon, Type} = sequelize.models;

Pokemon.belongsToMany(Type, {through: 'type_pokemon'});
Type.belongsToMany(Pokemon, {through: 'type_pokemon'});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
