import {useEffect} from 'react';
import Card from './Card';
import {CardsContainer} from '../styles/Cards.styles';
import {useSelector, useDispatch} from 'react-redux';
import {getTypes, getTypesRelations} from '../redux/actions';

const Cards = ({startIndex, endIndex}) => {
  const missingNoPokemon = {
    id: '000',
    name: 'MissingNo',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/MissingNo.svg/800px-MissingNo.svg.png',
    types: [
      {
        name: 'normal',
        icon: 'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705536696/pokemon/icons/pokemon_icon_213976_yy8wzo.svg',
        image:
          'https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705537375/pokemon/bg/White_Wallpaper_jcu1le.png',
      },
    ],
    abilities: [{name: 'unknown'}],
    moves: [{name: 'unknown'}],
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getTypesRelations());
  }, [dispatch]);

  const filteredPokemons = useSelector(state => state.filteredPokemons);
  const pokemonOnFocus = useSelector(state => state.pokemonOnFocus);
  const searchStatus = useSelector(state => state.searchStatus);

  const pokemonsToShow = filteredPokemons.slice(startIndex, endIndex);

  const renderContent = () => {
    if (searchStatus === 'not_found') {
      return <Card key='missingno' pokemon={missingNoPokemon} />;
    } else if (searchStatus === 'error') {
      return <div>Error fetching Pokémon</div>;
    } else if (pokemonOnFocus.length > 0) {
      return pokemonOnFocus.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />);
    } else {
      return pokemonsToShow
        .filter(pokemon => pokemon !== null)
        .map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />);
    }
  };

  return <CardsContainer>{renderContent()}</CardsContainer>;
};

export default Cards;
