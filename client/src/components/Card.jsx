import {Link} from 'react-router-dom';
import {
  CardContainer,
  InfoContainer,
  PokemonId,
  PokemonName,
  PokemonType,
  TypeIcon,
  ImageContainer,
  PokemonImage,
  TypesContainer,
  AbilitiesContainer,
} from '../styles/Card.styles';
import {colors} from '../utils/colors';

const Card = ({pokemon}) => {
  let {name, id, image, types, abilities} = pokemon;

  return (
    <Link to={`/detail/${pokemon.id}`} style={{textDecoration: 'none'}}>
      <CardContainer>
        <ImageContainer $background={types[0].image}>
          <PokemonImage src={image} alt={name} />
        </ImageContainer>
        <InfoContainer>
          <TypesContainer>
            {types.map((type, index) => (
              <PokemonType key={index} $typeColor={colors[type.name]}>
                {type.name}
              </PokemonType>
            ))}
          </TypesContainer>
          <PokemonName>{name}</PokemonName>
          <PokemonId>#{id}</PokemonId>
          <AbilitiesContainer>
            {abilities.map((ability, index) => (
              <div key={index}>{ability.name}</div>
            ))}
          </AbilitiesContainer>
        </InfoContainer>
        <TypeIcon src={types[0].icon} alt={types[0].name} $typecolor={colors[types[0].name]} />
      </CardContainer>
    </Link>
  );
};

export default Card;
