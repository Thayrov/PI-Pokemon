const {Pokemon, Move} = require('../config/db.config');
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
const {Sequelize, Op} = require('sequelize');

const getPokemons = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 12;

    const {count, rows: existingPokemons} = await Pokemon.findAndCountAll({
      where: {
        id: {
          [Op.between]: [offset + 1, offset + limit],
        },
      },
      distinct: true,
      order: [['id', 'ASC']],
    });

    let data;
    if (existingPokemons.length === limit) {
      data = await getPokemonsFromDB(offset, limit, count, existingPokemons);
    } else {
      data = await getPokemonsFromAPI(offset, limit);
    }
    const customPokemons = await Pokemon.findAll({
      where: {
        id: {
          [Op.gte]: 20000,
        },
      },
      order: [['id', 'ASC']],
    });

    data.results = [...data.results, ...customPokemons];

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPokemonDetail = async (req, res) => {
  try {
    const {idPokemon} = req.params;

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

const getPokemonByName = async (req, res) => {
  try {
    const name = req.query.name?.toLowerCase();

    let pokemons = await Pokemon.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `${name}`,
        },
      },
    });

    const response = await axios.get(`${API_URL}/pokemon?limit=1032`);
    if (response.data.results) {
      const filteredPokemons = response.data.results.filter(p => p.name.toLowerCase() === name);

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

    const lastCustomId = await Pokemon.max('id', {
      where: {
        id: {
          [Sequelize.Op.gte]: 20000,
        },
      },
    });

    const nextCustomId = !isNaN(lastCustomId) && lastCustomId >= 20000 ? lastCustomId + 1 : 20000;

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

const updatePokemon = async (req, res) => {
  try {
    const {idPokemon} = req.params;
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

    let pokemon = await Pokemon.findOne({where: {id: idPokemon}});

    if (!pokemon) {
      return res.status(404).send('Pokemon not found');
    }

    await pokemon.update({
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

    if (types && types.length) {
      await processTypes(types, pokemon);
    }
    if (abilities && abilities.length) {
      await processAbilities(abilities, pokemon);
    }
    if (moves && moves.length) {
      await processMoves(moves, pokemon);
    }

    res.status(200).json(pokemon);
  } catch (error) {
    console.error('Error updating Pokemon:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deletePokemon = async (req, res) => {
  try {
    const {idPokemon} = req.params;

    let pokemon = await Pokemon.findOne({where: {id: idPokemon}});
    if (!pokemon) {
      return res.status(404).send('Pokemon not found');
    }

    await pokemon.destroy();

    res.status(200).send('Pokemon deleted successfully');
  } catch (error) {
    console.error('Error deleting Pokemon:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getPokemons,
  getPokemonDetail,
  getPokemonByName,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
