import styled from 'styled-components';

const Card = ({name, id, image, type, icon, backgroundImage, typeColor}) => {
  return (
    <CardContainer>
      <ImageContainer background={backgroundImage}>
        <PokemonImage src={image} alt={name} />
      </ImageContainer>
      <InfoContainer>
        <PokemonId>#{id}</PokemonId>
        <PokemonName>{name}</PokemonName>
        <PokemonType>{type}</PokemonType>
      </InfoContainer>
      <TypeIcon src={icon} alt={name} typecolor={typeColor} />
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  width: 15rem;
  height: 9rem;
  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 6px 1px #40413f;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    width: 23rem;
    height: 13rem;
  }
`;

const ImageContainer = styled.div`
  width: 110%;
  height: 100%;
  background: #cef1a4;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PokemonImage = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

const TypeIcon = styled.img`
  position: absolute;
  top: 10%;
  max-width: 35%;
  max-height: 35%;
  background-color: #7ac74c;
  background-color: ${props => props.typecolor};
  border-radius: 50%;
  padding: 8px;
  left: 44%;
  border: 6px solid rgba(${({theme: {colors}}) => colors.Jet}, 1);
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    max-width: 30%;
    max-height: 30%;
    padding: 13px;
  }
`;

const InfoContainer = styled.div`
  width: 90%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const PokemonType = styled.div`
  background: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-weight: bold;
  color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  font-size: 0.8rem;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
  }
`;

const PokemonId = styled.div`
  font-size: 1rem;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);

  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const PokemonName = styled.div`
  font-size: 0.8rem;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);

  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;
