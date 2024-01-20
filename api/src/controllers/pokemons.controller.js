const {Pokemon, Type, Ability, Move} = require('../config/db.config');
const {getPokemonsFromAPI, getPokemonsFromDB} = require('../helpers/pokemon.helper');

const getPokemons = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 20;

    let data;
    const {count, rows: existingPokemons} = await Pokemon.findAndCountAll({
      include: [
        {model: Type, as: 'Types'},
        {model: Move, as: 'Moves'},
        {model: Ability, as: 'Abilities'},
      ],
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

// const getPokemonsFromAPI = async (offset, limit) => {
//   try {
//     const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
//     if (!response.data || typeof response.data.count === 'undefined') {
//       throw new Error('Invalid response structure from external API');
//     }

//     const {count, next, previous, results: pokemonList} = response.data;

//     const detailedPokemons = await Promise.all(
//       pokemonList.map(async pokemon => {
//         try {
//           const detailedResponse = await axios.get(pokemon.url);
//           const detailedData = detailedResponse.data;

//           const [newPokemon, created] = await Pokemon.findOrCreate({
//             where: {
//               id: detailedData.id,
//               name: detailedData.name,
//               image: detailedData.sprites.other.home.front_default,
//               hp: detailedData.stats[0].base_stat,
//               attack: detailedData.stats[1].base_stat,
//               special_attack: detailedData.stats[3].base_stat,
//               defense: detailedData.stats[2].base_stat,
//               special_defense: detailedData.stats[4].base_stat,
//               speed: detailedData.stats[5].base_stat,
//               height: detailedData.height,
//               weight: detailedData.weight,
//             },
//           });

//           if (created) {
//             const types = detailedData.types.map(typeInfo => typeInfo.type.name);
//             const abilities = detailedData.abilities.map(abilityInfo => abilityInfo.ability.name);
//             const moves = detailedData.moves.map(moveInfo => moveInfo.move.name);

//             await processTypes(types, newPokemon);
//             await processAbilities(abilities, newPokemon);
//             await processMoves(moves, newPokemon);
//           }

//           return formatPokemonData(detailedData);
//         } catch (error) {
//           console.error(`Failed to fetch details for ${pokemon.name}: ${error}`);
//           return null;
//         }
//       }),
//     );

//     return {
//       count,
//       next,
//       previous,
//       results: detailedPokemons,
//     };
//   } catch (error) {
//     console.error(`Error fetching from API: ${error}`);
//     throw error;
//   }
// };

// const formatPokemonData = data => {
//   return {
//     id: data.id,
//     name: data.name,
//     image: data.sprites.other.home.front_default,
//     hp: data.stats[0].base_stat,
//     attack: data.stats[1].base_stat,
//     special_attack: data.stats[3].base_stat,
//     defense: data.stats[2].base_stat,
//     special_defense: data.stats[4].base_stat,
//     speed: data.stats[5].base_stat,
//     height: data.height,
//     weight: data.weight,
//   };
// };

// const getPokemonsFromDB = async (offset, limit, count, pokemons) => {
//   try {
//     return {
//       count,
//       next: calculateNextPageUrl(offset, limit, count),
//       previous: calculatePreviousPageUrl(offset, limit),
//       results: pokemons.map(pokemon => formatPokemonForResponse(pokemon)),
//     };
//   } catch (error) {
//     console.error(`Error fetching from DB: ${error}`);
//     throw error;
//   }
// };

// function calculateNextPageUrl(offset, limit, totalCount) {
//   if (offset + limit < totalCount) {
//     return `/api/pokemons?offset=${offset + limit}&limit=${limit}`;
//   }
//   return null;
// }

// function calculatePreviousPageUrl(offset, limit) {
//   if (offset > 0) {
//     const prevOffset = Math.max(0, offset - limit);
//     return `/api/pokemons?offset=${prevOffset}&limit=${limit}`;
//   }
//   return null;
// }

// const formatPokemonForResponse = pokemon => {
//   return {
//     id: pokemon.id,
//     name: pokemon.name,
//     image: pokemon.image,
//     hp: pokemon.hp,
//     attack: pokemon.attack,
//     special_attack: pokemon.special_attack,
//     defense: pokemon.defense,
//     special_defense: pokemon.special_defense,
//     speed: pokemon.speed,
//     height: pokemon.height,
//     weight: pokemon.weight,
//   };
// };

// async function processTypes(typeNames, pokemon) {
//   let typesPromises = typeNames.map(async typeName => {
//     const [typeInstance, created] = await Type.findOrCreate({
//       where: {name: typeName},
//       defaults: {
//         icon: determineIconType(typeName),
//         image: determineImageType(typeName),
//       },
//     });

//     const alreadyAssociated = await pokemon.hasType(typeInstance);
//     if (!alreadyAssociated) {
//       await pokemon.addType(typeInstance);
//     }
//   });
//   return await Promise.all(typesPromises);
// }

// async function processAbilities(abilitiesNames, pokemon) {
//   let abilitiesPromises = abilitiesNames.map(async abilityName => {
//     const [abilityInstance] = await Ability.findOrCreate({
//       where: {name: abilityName},
//     });

//     const alreadyAssociated = await pokemon.hasAbility(abilityInstance);
//     if (!alreadyAssociated) {
//       await pokemon.addAbility(abilityInstance);
//     }
//   });
//   return await Promise.all(abilitiesPromises);
// }

// async function processMoves(movesNames, pokemon) {
//   let movesPromises = movesNames.map(async moveName => {
//     const [moveInstance] = await Move.findOrCreate({
//       where: {name: moveName},
//     });
//     const alreadyAssociated = await pokemon.hasMove(moveInstance);
//     if (!alreadyAssociated) {
//       await pokemon.addMove(moveInstance);
//     }
//   });
//   return await Promise.all(movesPromises);
// }

module.exports = {getPokemons};
