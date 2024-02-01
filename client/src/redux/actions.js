import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Action Types
export const RESET = 'RESET';

export const POKEMON_NOT_FOUND = 'POKEMON_NOT_FOUND';
export const POKEMON_FETCH_ERROR = 'POKEMON_FETCH_ERROR';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';

export const GET_TYPES = 'GET_TYPES';
export const GET_TYPES_BY_POKEMON_ID = 'GET_TYPES_BY_POKEMON_ID';
export const GET_TYPES_RELATIONS = 'GET_TYPES_RELATIONS';

export const GET_ABILITIES_BY_POKEMON_ID = 'GET_ABILITIES_BY_POKEMON_ID';

export const CREATE_POKEMON = 'CREATE_POKEMON';

export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const FILTER_BY_ABILITY = 'FILTER_BY_ABILITY';
export const FILTER_BY_D_DAMAGE_TO = 'FILTER_BY_D_DAMAGE_TO';
export const FILTER_BY_D_DAMAGE_FROM = 'FILTER_BY_D_DAMAGE_FROM';
export const FILTER_BY_H_DAMAGE_TO = 'FILTER_BY_H_DAMAGE_TO';
export const FILTER_BY_H_DAMAGE_FROM = 'FILTER_BY_H_DAMAGE_FROM';
export const FILTER_BY_N_DAMAGE_TO = 'FILTER_BY_N_DAMAGE_TO';
export const FILTER_BY_N_DAMAGE_FROM = 'FILTER_BY_N_DAMAGE_FROM';

export const SORT_POKEMONS_BY_ID = 'SORT_POKEMONS_BY_ID';
export const SORT_POKEMONS_BY_NAME = 'SORT_POKEMONS_BY_NAME';
export const SORT_POKEMONS_BY_HP = 'SORT_POKEMONS_BY_HP';
export const SORT_POKEMONS_BY_ATK = 'SORT_POKEMONS_BY_ATK';
export const SORT_POKEMONS_BY_S_ATK = 'SORT_POKEMONS_BY_S_ATK';
export const SORT_POKEMONS_BY_DEF = 'SORT_POKEMONS_BY_DEF';
export const SORT_POKEMONS_BY_S_DEF = 'SORT_POKEMONS_BY_S_DEF';
export const SORT_POKEMONS_BY_SPEED = 'SORT_POKEMONS_BY_SPEED';
export const SORT_POKEMONS_BY_HEIGHT = 'SORT_POKEMONS_BY_HEIGHT';
export const SORT_POKEMONS_BY_WEIGHT = 'SORT_POKEMONS_BY_WEIGHT';

// Action Creators

export const reset = () => {
  return {
    type: RESET,
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const {data} = await axios.get(`${VITE_API_URL}/types`);
      return dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };
};

export const getTypesRelations = () => {
  return async function (dispatch) {
    try {
      const {data} = await axios.get(`${VITE_API_URL}/types/relations`);
      return dispatch({
        type: GET_TYPES_RELATIONS,
        payload: data,
      });
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };
};

export const getPokemons = (page, pageSize) => {
  return async function (dispatch, getState) {
    const {pokemons} = getState();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const pagePokemons = pokemons.slice(startIndex, endIndex);
    const needsLoading =
      pagePokemons.includes(null) ||
      pagePokemons.includes(undefined) ||
      pagePokemons.length < pageSize;

    if (needsLoading) {
      try {
        const {
          data: {results},
        } = await axios.get(`${VITE_API_URL}/pokemons?limit=${pageSize}&offset=${startIndex}`);

        const pokemonsWithTypesAndAbilitiesPromises = results.map(async pokemon => {
          const typesResponse = await axios.get(`${VITE_API_URL}/types/${pokemon.id}`);
          const sortedTypes = typesResponse.data.sort((a, b) => a.name.localeCompare(b.name));

          const abilitiesResponse = await axios.get(`${VITE_API_URL}/abilities/${pokemon.id}`);
          const sortedAbilities = abilitiesResponse.data.sort((a, b) =>
            a.name.localeCompare(b.name),
          );

          const movesResponse = await axios.get(`${VITE_API_URL}/moves/${pokemon.id}`);
          const sortedMoves = movesResponse.data.sort((a, b) => a.name.localeCompare(b.name));

          return {...pokemon, types: sortedTypes, abilities: sortedAbilities, moves: sortedMoves};
        });

        const pokemonsWithDetails = await Promise.all(pokemonsWithTypesAndAbilitiesPromises);

        dispatch({
          type: GET_POKEMONS,
          payload: {pokemons: pokemonsWithDetails.sort((a, b) => a.id - b.id), page},
        });
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    }
  };
};

export const getPokemonById = id => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${VITE_API_URL}/pokemon/${id}`);
      if (response.status === 200) {
        const {data} = response;
        const typesResponse = await axios.get(`${VITE_API_URL}/types/${data.id}`);
        const sortedTypes = typesResponse.data.sort((a, b) => a.name.localeCompare(b.name));

        const abilitiesResponse = await axios.get(`${VITE_API_URL}/abilities/${data.id}`);
        const sortedAbilities = abilitiesResponse.data.sort((a, b) => a.name.localeCompare(b.name));

        const movesResponse = await axios.get(`${VITE_API_URL}/moves/${data.id}`);
        const sortedMoves = movesResponse.data.sort((a, b) => a.name.localeCompare(b.name));

        let pokemonsWithTypesAndAbilities = {
          ...data,
          types: sortedTypes,
          abilities: sortedAbilities,
          moves: sortedMoves,
        };

        dispatch({
          type: GET_POKEMON_BY_ID,
          payload: pokemonsWithTypesAndAbilities,
        });
      }
    } catch (error) {
      console.error('Error fetching pokemon:', error);
      dispatch({
        type: POKEMON_NOT_FOUND,
      });
    }
  };
};

export const getPokemonByName = name => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${VITE_API_URL}/pokemons/name?name=${name}`);

      if (response.status === 200 && response.data.length > 0) {
        const {data} = response;

        const typesResponse = await axios.get(`${VITE_API_URL}/types/${data[0].id}`);
        const sortedTypes = typesResponse.data.sort((a, b) => a.name.localeCompare(b.name));

        const abilitiesResponse = await axios.get(`${VITE_API_URL}/abilities/${data[0].id}`);
        const sortedAbilities = abilitiesResponse.data.sort((a, b) => a.name.localeCompare(b.name));

        const movesResponse = await axios.get(`${VITE_API_URL}/moves/${data[0].id}`);
        const sortedMoves = movesResponse.data.sort((a, b) => a.name.localeCompare(b.name));

        let pokemonsWithTypesAndAbilities = {
          ...data[0],
          types: sortedTypes,
          abilities: sortedAbilities,
          moves: sortedMoves,
        };
        dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: pokemonsWithTypesAndAbilities,
        });
      }
    } catch (error) {
      console.error('Error fetching pokemon:', error);
      dispatch({
        type: POKEMON_NOT_FOUND,
      });
    }
  };
};

export const filterByType = type => {
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
};

export const filterByAbility = ability => {
  return {
    type: FILTER_BY_ABILITY,
    payload: ability,
  };
};

export const filterBySource = source => {
  return {
    type: FILTER_BY_SOURCE,
    payload: source,
  };
};

export const filterByDoubleDamageTo = typeName => {
  return {
    type: FILTER_BY_D_DAMAGE_TO,
    payload: typeName,
  };
};

export const filterByDoubleDamageFrom = typeName => {
  return {
    type: FILTER_BY_D_DAMAGE_FROM,
    payload: typeName,
  };
};

export const filterByHalfDamageTo = typeName => {
  return {
    type: FILTER_BY_H_DAMAGE_TO,
    payload: typeName,
  };
};

export const filterByHalfDamageFrom = typeName => {
  return {
    type: FILTER_BY_H_DAMAGE_FROM,
    payload: typeName,
  };
};

export const filterByNoDamageTo = typeName => {
  return {
    type: FILTER_BY_N_DAMAGE_TO,
    payload: typeName,
  };
};

export const filterByNoDamageFrom = typeName => {
  return {
    type: FILTER_BY_N_DAMAGE_FROM,
    payload: typeName,
  };
};

export const sortPokemonsById = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_ID,
  payload: order,
});

export const sortPokemonsByName = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_NAME,
  payload: order,
});
export const sortPokemonsByHP = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_HP,
  payload: order,
});

export const sortPokemonsByAttack = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_ATK,
  payload: order,
});

export const sortPokemonsBySpecialAttack = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_S_ATK,
  payload: order,
});

export const sortPokemonsByDefense = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_DEF,
  payload: order,
});

export const sortPokemonsBySpecialDefense = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_S_DEF,
  payload: order,
});

export const sortPokemonsBySpeed = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_SPEED,
  payload: order,
});

export const sortPokemonsByHeight = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_HEIGHT,
  payload: order,
});

export const sortPokemonsByWeight = (order = 'ascending') => ({
  type: SORT_POKEMONS_BY_WEIGHT,
  payload: order,
});
