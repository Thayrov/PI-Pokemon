require('dotenv').config();
const {DB_CONN_STRING} = require('./env.config');
const {Sequelize} = require('sequelize');
const PokemonModel = require('../models/Pokemon');
const TypeModel = require('../models/Type');
const AbilityModel = require('../models/Ability');
const MoveModel = require('../models/Move');
const TypeRelationshipModel = require('../models/TypeRelationship');

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
  logging: console.log('Connected to DB...', process.argv[2]),
  native: false,
  dialectOptions: dialectOptionsByEnv,
});

PokemonModel(sequelize);
TypeModel(sequelize);
AbilityModel(sequelize);
MoveModel(sequelize);
TypeRelationshipModel(sequelize);

const {Pokemon, Type, Ability, Move, TypeRelationship} = sequelize.models;

Pokemon.belongsToMany(Type, {through: 'pokemon_type'});
Type.belongsToMany(Pokemon, {through: 'pokemon_type'});

Pokemon.belongsToMany(Ability, {through: 'pokemon_ability'});
Ability.belongsToMany(Pokemon, {through: 'pokemon_ability'});

Pokemon.belongsToMany(Move, {through: 'pokemon_move'});
Move.belongsToMany(Pokemon, {through: 'pokemon_move'});

Type.belongsToMany(Type, {
  as: 'RelatedTypes',
  through: TypeRelationship,
  foreignKey: 'typeId',
  otherKey: 'relatedTypeId',
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
