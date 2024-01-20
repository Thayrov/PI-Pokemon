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
const {Sequelize} = require('sequelize');

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
    let pokemon;
    if (isNaN(parseInt(idPokemon))) {
      pokemon = await Pokemon.findOne({
        where: {name: idPokemon},
      });
    } else {
      pokemon = await Pokemon.findOne({
        where: {id: idPokemon},
      });
    }

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

const getPokemonByName = async (req, res) => {
  try {
    const name = req.query.name?.toLowerCase();

    // Buscar en la base de datos
    let pokemons = await Pokemon.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
    });

    // Buscar en la API externa
    const response = await axios.get(`${API_URL}/pokemon?limit=1032`);
    if (response.data.results) {
      const filteredPokemons = response.data.results.filter(p => p.name.includes(name));

      for (const p of filteredPokemons) {
        const detailedResponse = await axios.get(p.url);
        const detailedData = detailedResponse.data;

        let existingPokemon = await Pokemon.findOne({where: {id: detailedData.id}});
        if (!existingPokemon) {
          const newPokemonData = formatPokemonData(detailedData);
          existingPokemon = await Pokemon.create(newPokemonData);

          const types = detailedData.types.map(typeInfo => typeInfo.type.name);
          const abilities = detailedData.abilities.map(abilityInfo => abilityInfo.ability.name);
          const moves = detailedData.moves.map(moveInfo => moveInfo.move.name);

          await processTypes(types, existingPokemon);
          await processAbilities(abilities, existingPokemon);
          await processMoves(moves, existingPokemon);
        }

        if (!pokemons.find(poke => poke.id === existingPokemon.id)) {
          pokemons.push(existingPokemon);
        }
      }
    }

    if (pokemons.length === 0) {
      return res.status(404).send('Pokemon not found');
    }

    res.status(200).json(pokemons);
  } catch (error) {
    console.error('Error en getPokemonByName:', error);
    res.status(500).send('Internal Server Error');
  }
};

const createPokemon = async (req, res) => {
  try {
    const {
      name,
      image,
      hp,
      attack,
      special_attack,
      defense,
      special_defense,
      speed,
      height,
      weight,
      types,
      abilities,
      moves,
    } = req.body;

    // Determine the next custom ID
    const lastCustomId = await Pokemon.max('id', {
      where: {
        id: {
          [Sequelize.Op.gte]: 20000,
        },
      },
    });

    const nextCustomId = !isNaN(lastCustomId) && lastCustomId >= 20000 ? lastCustomId + 1 : 20000;

    // Create the custom Pokemon
    const newPokemon = await Pokemon.create({
      id: nextCustomId,
      name,
      image,
      hp,
      attack,
      special_attack,
      defense,
      special_defense,
      speed,
      height,
      weight,
    });

    // Procesar y agregar tipos, habilidades y movimientos
    if (types && types.length) {
      await processTypes(types, newPokemon);
    }
    if (abilities && abilities.length) {
      await processAbilities(abilities, newPokemon);
    }
    if (moves && moves.length) {
      await processMoves(moves, newPokemon);
    }

    res.status(201).json(newPokemon);
  } catch (error) {
    console.error('Error creating new Pokemon:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {getPokemons, getPokemonDetail, getPokemonByName, createPokemon};
