import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {GoBackButton} from './GoBackButton';
import {colors} from '../utils/colors';
import {
  DataInfo,
  DetailContainer,
  InfoContent,
  InfoSection,
  InfoTitle,
  PokemonInfo,
  PokemonImage,
  PokemonName,
} from '../styles/Detail.styles';

const Detail = () => {
  const {id} = useParams();
  const pokemons = useSelector(state => state.pokemons);
  const pokemon = pokemons.filter(p => p !== null).find(p => p.id === parseInt(id));

  if (!pokemon) {
    return <div>Pokemon not found</div>;
  }
  const backgroundImage = pokemon.types.length > 0 ? pokemon.types[0].image : null;
  const typeColor = pokemon.types.length > 0 ? colors[pokemon.types[0].name] : null;

  return (
    <DetailContainer $backgroundImage={backgroundImage} $typeColor={typeColor}>
      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonImage src={pokemon.image} alt={pokemon.name} />
      <DataInfo>
        <PokemonInfo>HP: {pokemon.hp}</PokemonInfo>
        <PokemonInfo>Attack: {pokemon.attack}</PokemonInfo>
        <PokemonInfo>Special Attack: {pokemon.special_attack}</PokemonInfo>
        <PokemonInfo>Defense: {pokemon.defense}</PokemonInfo>
        <PokemonInfo>Special Defense: {pokemon.special_defense}</PokemonInfo>
        <PokemonInfo>Speed: {pokemon.speed}</PokemonInfo>
        <PokemonInfo>Height: {pokemon.height}</PokemonInfo>
        <PokemonInfo>Weight: {pokemon.weight}</PokemonInfo>
      </DataInfo>
      <InfoSection>
        <InfoTitle>Types</InfoTitle>
        {pokemon.types.map((type, index) => (
          <InfoContent key={index}>{type.name}</InfoContent>
        ))}
      </InfoSection>
      <InfoSection>
        <InfoTitle>Abilities</InfoTitle>
        {pokemon.abilities.map((ability, index) => (
          <InfoContent key={index}>{ability.name}</InfoContent>
        ))}
      </InfoSection>
      <GoBackButton />
    </DetailContainer>
  );
};

export default Detail;
