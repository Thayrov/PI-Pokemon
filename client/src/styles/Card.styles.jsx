import styled from 'styled-components';

export const PokemonImage = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

export const ImageContainer = styled.div`
  width: 90%;
  height: 100%;
  background: #cef1a4;
  background-image: url(${props => props.$background});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    width: 110%;
  }
`;

export const CardContainer = styled.div`
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 4px 4px 12px 2px #40413f;
  }
  &:hover > ${ImageContainer} > ${PokemonImage} {
    animation: pokemonAni 1s ease 0s 1 normal none;
  }

  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    width: 23rem;
    height: 13rem;
  }

  @keyframes pokemonAni {
    0%,
    100% {
      transform: rotate(0deg);
      transform-origin: 50% 100%;
    }

    10% {
      transform: rotate(2deg);
    }

    60% {
      transform: rotate(-2deg);
    }

    70% {
      transform: rotate(2deg);
    }

    80% {
      transform: rotate(-2deg);
    }

    90% {
      transform: rotate(2deg);
    }
  }
`;

export const TypeIcon = styled.img`
  position: absolute;
  top: 10%;
  max-width: 35%;
  max-height: 35%;
  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  background-color: ${props => props.$typecolor};
  border-radius: 50%;
  padding: 8px;
  left: 35%;
  border: 6px solid rgba(${({theme: {colors}}) => colors.Jet}, 1);
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    max-width: 30%;
    max-height: 30%;
    padding: 13px;
    left: 44%;
  }
`;

export const InfoContainer = styled.div`
  width: 110%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  font-variant: small-caps;

  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    padding: 1rem;
    width: 90%;
  }
`;

export const TypesContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    gap: 0.5rem;
  }
`;

export const PokemonType = styled.div`
  border-radius: 15px;
  font-weight: bold;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  color: ${({$typeColor}) => $typeColor || 'rgba(0, 0, 0, 0.5)'};
  font-size: 0.7rem;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const PokemonId = styled.div`
  font-size: 1rem;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);

  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

export const PokemonName = styled.div`
  font-size: 1rem;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  text-align: right;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const AbilitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  justify-content: flex-end;
  > div {
    background-color: rgba(${({theme: {colors}}) => colors.Platinum}, 0.5);
    border-radius: 10px;
    padding: 0.15rem 0.25rem;
    font-size: 0.7rem;
  }
`;
