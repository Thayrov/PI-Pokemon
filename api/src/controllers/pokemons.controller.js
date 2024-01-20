const {Pokemon, Type, Ability, Move} = require('../config/db.config');
const {processAbilities} = require('../helpers/ability.helper');
const {processMoves} = require('../helpers/move.helper');
const {
  getPokemonsFromAPI,
  getPokemonsFromDB,
  formatPokemonData,
} = require('../helpers/pokemon.helper');
const {processTypes} = require('../helpers/type.helper');
const {API_URL} = require('../config/env.config');
const axios = require('axios');

const getPokemons = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 20;

    let data;
    const {count, rows: existingPokemons} = await Pokemon.findAndCountAll({
      offset,
      limit,
      distinct: true,
    });

    if (existingPokemons.length < limit) {
      data = await getPokemonsFromAPI(offset, limit);
    } else {
      data = await getPokemonsFromDB(offset, limit, count, existingPokemons);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPokemonDetail = async (req, res) => {
  try {
    const idPokemon = req.params.idPokemon;
    let pokemon = await Pokemon.findOne({
      where: {id: idPokemon},
    });

    if (!pokemon) {
      const response = await axios.get(`${API_URL}/pokemon/${idPokemon}`);
      if (!response.data) {
        return res.status(404).send('Pokemon not found');
      }

      const detailedData = response.data;
      const newPokemonData = formatPokemonData(detailedData);
      const newPokemon = await Pokemon.create(newPokemonData);
      const types = detailedData.types.map(typeInfo => typeInfo.type.name);
      const abilities = detailedData.abilities.map(abilityInfo => abilityInfo.ability.name);
      const moves = detailedData.moves.map(moveInfo => moveInfo.move.name);
      await processTypes(types, newPokemon);
      await processAbilities(abilities, newPokemon);
      await processMoves(moves, newPokemon);

      pokemon = newPokemon;
    }

    res.status(200).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {getPokemons, getPokemonDetail};
