import {
  FILTER_BY_ABILITY,
  FILTER_BY_D_DAMAGE_FROM,
  FILTER_BY_D_DAMAGE_TO,
  FILTER_BY_H_DAMAGE_FROM,
  FILTER_BY_H_DAMAGE_TO,
  FILTER_BY_N_DAMAGE_FROM,
  FILTER_BY_N_DAMAGE_TO,
  FILTER_BY_SOURCE,
  FILTER_BY_TYPE,
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  GET_TYPES_RELATIONS,
  POKEMON_NOT_FOUND,
  RESET,
  SORT_POKEMONS_BY_ATK,
  SORT_POKEMONS_BY_DEF,
  SORT_POKEMONS_BY_HEIGHT,
  SORT_POKEMONS_BY_HP,
  SORT_POKEMONS_BY_ID,
  SORT_POKEMONS_BY_NAME,
  SORT_POKEMONS_BY_SPEED,
  SORT_POKEMONS_BY_S_ATK,
  SORT_POKEMONS_BY_S_DEF,
  SORT_POKEMONS_BY_WEIGHT,
} from './actions';

const initialState = {
  pokemons: [],
  types: [],
  abilities: [],
  filteredPokemons: [],
  pokemonOnFocus: [],
  typesRelations: [],
  pagesLoaded: [],
};
const pageSize = 12;

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };
    case GET_TYPES_RELATIONS:
      return {
        ...state,
        typesRelations: payload,
      };

    case GET_POKEMONS: {
      const {pokemons: newPokemons, page} = payload;
      const startIndex = (page - 1) * pageSize;

      let updatedPokemons = [...state.pokemons];

      if (updatedPokemons.length < startIndex) {
        updatedPokemons.length = startIndex;
        updatedPokemons.fill(null, state.pokemons.length);
      }

      newPokemons.forEach((pokemon, index) => {
        updatedPokemons[startIndex + index] = pokemon;
      });

      const allAbilities = updatedPokemons
        .filter(pokemon => pokemon !== null)
        .map(pokemon => pokemon.abilities.map(ability => ability.name))
        .flat();
      const abilitiesSet = new Set(allAbilities);
      const uniqueAbilities = [...abilitiesSet];

      return {
        ...state,
        pokemons: updatedPokemons,
        filteredPokemons: updatedPokemons,
        abilities: uniqueAbilities,
        searchStatus: 'ok',
        pokemonOnFocus: [],
      };
    }

    case GET_POKEMON_BY_ID:
    case GET_POKEMON_BY_NAME: {
      const pokemonOnFocusArray = Array.isArray(payload) ? payload : [payload];

      const pokemonsMap = new Map(state.pokemons.map(pokemon => [pokemon.id, pokemon]));
      pokemonOnFocusArray.forEach(pokemon => pokemonsMap.set(pokemon.id, pokemon));
      const updatedPokemons = Array.from(pokemonsMap.values());

      const filteredPokemonsMap = new Map(
        state.filteredPokemons.map(pokemon => [pokemon.id, pokemon]),
      );
      pokemonOnFocusArray.forEach(pokemon => filteredPokemonsMap.set(pokemon.id, pokemon));
      const updatedFilteredPokemons = Array.from(filteredPokemonsMap.values());

      return {
        ...state,
        pokemonOnFocus: pokemonOnFocusArray,
        pokemons: [...state.pokemons, ...updatedPokemons],
        filteredPokemons: updatedFilteredPokemons,
        searchStatus: 'ok',
      };
    }

    case POKEMON_NOT_FOUND:
      return {
        ...state,
        pokemonOnFocus: [],
        searchStatus: 'not_found',
      };

    case FILTER_BY_TYPE: {
      const filteredByType = state.pokemons.filter(
        pokemon => pokemon !== null && pokemon.types.some(type => type.name === payload),
      );

      return {
        ...state,
        filteredPokemons: filteredByType.length > 0 ? filteredByType : state.filteredPokemons,
        searchStatus: 'ok',
      };
    }

    case FILTER_BY_ABILITY: {
      const filteredByAbility = state.pokemons.filter(
        pokemon => pokemon !== null && pokemon.abilities.some(ability => ability.name === payload),
      );
      return {
        ...state,
        filteredPokemons: filteredByAbility,
        searchStatus: 'ok',
      };
    }

    case FILTER_BY_SOURCE: {
      let filteredPokemons = [];

      if (payload.toUpperCase() === 'API') {
        filteredPokemons = state.pokemons.filter(
          pokemon => pokemon !== null && pokemon.id >= 1 && pokemon.id < 20000,
        );
      } else if (payload.toUpperCase() === 'DB') {
        filteredPokemons = state.pokemons.filter(
          pokemon => pokemon !== null && pokemon.id >= 20000,
        );
      }
      return {
        ...state,
        filteredPokemons: filteredPokemons,
      };
    }

    case FILTER_BY_D_DAMAGE_FROM: {
      const typeName = payload;
      const affectedTypeNames = state.typesRelations
        .find(typeRelation => typeRelation.typeName === typeName)
        ?.relations.filter(relation => relation.relationshipType === 'double_damage_to')
        .map(relation => relation.relatedTypeName);

      const filteredByDoubleDamageFrom = state.pokemons.filter(
        pokemon =>
          pokemon !== null && pokemon.types.some(type => affectedTypeNames.includes(type.name)),
      );

      return {
        ...state,
        filteredPokemons: filteredByDoubleDamageFrom,
      };
    }

    case FILTER_BY_D_DAMAGE_TO: {
      const typeName = payload;
      const affectedTypeNames = state.typesRelations
        .find(typeRelation => typeRelation.typeName === typeName)
        ?.relations.filter(relation => relation.relationshipType === 'double_damage_from')
        .map(relation => relation.relatedTypeName);

      const filteredByDoubleDamageTo = state.pokemons.filter(
        pokemon =>
          pokemon !== null && pokemon.types.some(type => affectedTypeNames.includes(type.name)),
      );

      return {
        ...state,
        filteredPokemons: filteredByDoubleDamageTo,
      };
    }

    case FILTER_BY_H_DAMAGE_TO: {
      const relatedTypes =
        state.typesRelations
          .find(relation => relation.typeName === payload)
          ?.relations.filter(relation => relation.relationshipType === 'half_damage_to')
          .map(relation => relation.relatedTypeName) || [];

      const filteredPokemons = state.pokemons.filter(
        pokemon => pokemon !== null && pokemon.types.some(type => relatedTypes.includes(type.name)),
      );

      return {
        ...state,
        filteredPokemons: filteredPokemons,
      };
    }

    case FILTER_BY_H_DAMAGE_FROM: {
      const relatedTypes =
        state.typesRelations
          .find(relation => relation.typeName === payload)
          ?.relations.filter(relation => relation.relationshipType === 'half_damage_from')
          .map(relation => relation.relatedTypeName) || [];

      const filteredPokemons = state.pokemons.filter(
        pokemon => pokemon !== null && pokemon.types.some(type => relatedTypes.includes(type.name)),
      );

      return {
        ...state,
        filteredPokemons: filteredPokemons,
      };
    }

    case FILTER_BY_N_DAMAGE_TO: {
      const relatedTypes =
        state.typesRelations
          .find(relation => relation.typeName === payload)
          ?.relations.filter(relation => relation.relationshipType === 'no_damage_to')
          .map(relation => relation.relatedTypeName) || [];

      const filteredPokemons = state.pokemons.filter(
        pokemon => pokemon !== null && pokemon.types.some(type => relatedTypes.includes(type.name)),
      );

      return {
        ...state,
        filteredPokemons: filteredPokemons,
      };
    }

    case FILTER_BY_N_DAMAGE_FROM: {
      const relatedTypes =
        state.typesRelations
          .find(relation => relation.typeName === payload)
          ?.relations.filter(relation => relation.relationshipType === 'no_damage_from')
          .map(relation => relation.relatedTypeName) || [];

      const filteredPokemons = state.pokemons.filter(
        pokemon => pokemon !== null && pokemon.types.some(type => relatedTypes.includes(type.name)),
      );

      return {
        ...state,
        filteredPokemons: filteredPokemons,
      };
    }

    case SORT_POKEMONS_BY_ID: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) => {
        return payload === 'ascending' ? a.id - b.id : b.id - a.id;
      });
      return {...state, filteredPokemons: sortedPokemons};
    }
    case SORT_POKEMONS_BY_NAME: {
      const sortedPokemons = [...state.filteredPokemons]
        .filter(pokemon => pokemon !== null)
        .sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          return payload === 'ascending'
            ? nameA < nameB
              ? -1
              : nameA > nameB
              ? 1
              : 0
            : nameA > nameB
            ? -1
            : nameA < nameB
            ? 1
            : 0;
        });

      return {...state, filteredPokemons: sortedPokemons};
    }

    case SORT_POKEMONS_BY_HP: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) =>
        payload === 'ascending' ? a.hp - b.hp : b.hp - a.hp,
      );
      return {...state, filteredPokemons: sortedPokemons};
    }

    case SORT_POKEMONS_BY_ATK: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) =>
        payload === 'ascending' ? a.attack - b.attack : b.attack - a.attack,
      );
      return {...state, filteredPokemons: sortedPokemons};
    }

    case SORT_POKEMONS_BY_S_ATK: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) =>
        payload === 'ascending'
          ? a.special_attack - b.special_attack
          : b.special_attack - a.special_attack,
      );
      return {...state, filteredPokemons: sortedPokemons};
    }

    case SORT_POKEMONS_BY_DEF: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) =>
        payload === 'ascending' ? a.defense - b.defense : b.defense - a.defense,
      );
      return {...state, filteredPokemons: sortedPokemons};
    }

    case SORT_POKEMONS_BY_S_DEF: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) =>
        payload === 'ascending'
          ? a.special_defense - b.special_defense
          : b.special_defense - a.special_defense,
      );
      return {...state, filteredPokemons: sortedPokemons};
    }

    case SORT_POKEMONS_BY_SPEED: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) =>
        payload === 'ascending' ? a.speed - b.speed : b.speed - a.speed,
      );
      return {...state, filteredPokemons: sortedPokemons};
    }

    case SORT_POKEMONS_BY_HEIGHT: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) =>
        payload === 'ascending' ? a.height - b.height : b.height - a.height,
      );
      return {...state, filteredPokemons: sortedPokemons};
    }

    case SORT_POKEMONS_BY_WEIGHT: {
      const sortedPokemons = [...state.filteredPokemons].sort((a, b) =>
        payload === 'ascending' ? a.weight - b.weight : b.weight - a.weight,
      );
      return {...state, filteredPokemons: sortedPokemons};
    }

    case RESET:
      return {
        ...state,
        searchStatus: 'ok',
        filteredPokemons: state.pokemons,
        pokemonOnFocus: [],
      };
    default:
      return state;
  }
};

export default reducer;
