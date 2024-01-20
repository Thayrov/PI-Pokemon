const {API_URL} = require('../config/env.config');
const {processTypes} = require('./type.helper');
const {processAbilities} = require('./ability.helper');
const {processMoves} = require('./move.helper');
const axios = require('axios');
const {Pokemon} = require('../config/db.config');

const getPokemonsFromAPI = async (offset, limit) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
    if (!response.data || typeof response.data.count === 'undefined') {
      throw new Error('Invalid response structure from external API');
    }

    const {count, next, previous, results: pokemonList} = response.data;

    const detailedPokemons = await Promise.all(
      pokemonList.map(async pokemon => {
        try {
          const detailedResponse = await axios.get(pokemon.url);
          const detailedData = detailedResponse.data;
          const [newPokemon, created] = await Pokemon.findOrCreate({
            where: {
              id: detailedData.id,
              name: detailedData.name,
              image: detailedData.sprites.other.home.front_default,
              hp: detailedData.stats[0].base_stat,
              attack: detailedData.stats[1].base_stat,
              special_attack: detailedData.stats[3].base_stat,
              defense: detailedData.stats[2].base_stat,
              special_defense: detailedData.stats[4].base_stat,
              speed: detailedData.stats[5].base_stat,
              height: detailedData.height,
              weight: detailedData.weight,
            },
          });

          if (created) {
            const types = detailedData.types.map(typeInfo => typeInfo.type.name);
            const abilities = detailedData.abilities.map(abilityInfo => abilityInfo.ability.name);
            const moves = detailedData.moves.map(moveInfo => moveInfo.move.name);

            await processTypes(types, newPokemon);
            await processAbilities(abilities, newPokemon);
            await processMoves(moves, newPokemon);
          }

          return formatPokemonData(detailedData);
        } catch (error) {
          console.error(`Failed to fetch details for ${pokemon.name}: ${error}`);
          return null;
        }
      }),
    );

    return {
      count,
      next,
      previous,
      results: detailedPokemons,
    };
  } catch (error) {
    console.error(`Error fetching from API: ${error}`);
    throw error;
  }
};

const formatPokemonData = data => {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other.home.front_default,
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    special_attack: data.stats[3].base_stat,
    defense: data.stats[2].base_stat,
    special_defense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
  };
};

const getPokemonsFromDB = async (offset, limit, count, pokemons) => {
  try {
    return {
      count,
      next: calculateNextPageUrl(offset, limit, count),
      previous: calculatePreviousPageUrl(offset, limit),
      results: pokemons.map(pokemon => formatPokemonForResponse(pokemon)),
    };
  } catch (error) {
    console.error(`Error fetching from DB: ${error}`);
    throw error;
  }
};

function calculateNextPageUrl(offset, limit, totalCount) {
  if (offset + limit < totalCount) {
    return `/api/pokemons?offset=${offset + limit}&limit=${limit}`;
  }
  return null;
}

function calculatePreviousPageUrl(offset, limit) {
  if (offset > 0) {
    const prevOffset = Math.max(0, offset - limit);
    return `/api/pokemons?offset=${prevOffset}&limit=${limit}`;
  }
  return null;
}

const formatPokemonForResponse = pokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    hp: pokemon.hp,
    attack: pokemon.attack,
    special_attack: pokemon.special_attack,
    defense: pokemon.defense,
    special_defense: pokemon.special_defense,
    speed: pokemon.speed,
    height: pokemon.height,
    weight: pokemon.weight,
  };
};

module.exports = {
  getPokemonsFromAPI,
  getPokemonsFromDB,
};
