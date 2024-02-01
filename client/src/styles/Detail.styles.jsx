import styled from 'styled-components';

export const DetailContainer = styled.div`
  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  border-radius: 10px;
  border: 2px solid ${props => props.$typeColor};
  box-shadow: 2px 2px 6px 1px ${props => props.$typeColor};
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  font-weight: bold;
`;

export const PokemonName = styled.h1`
  font-size: 2rem;
  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 0.5);
  border-radius: 10px;
  width: 100%;
  text-align: center;
  padding: 5px;
`;

export const PokemonImage = styled.img`
  width: 50%;
  border-radius: 10px;
  margin: 10px 0;
`;

export const PokemonInfo = styled.p`
  font-size: 1rem;
  margin: 5px 0;
`;

export const DataInfo = styled.div`
  margin-bottom: 20px;
  text-align: center;
  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 0.5);
  border-radius: 10px;
  width: 100%;
`;
export const InfoSection = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const InfoTitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 10px;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
`;

export const InfoContent = styled.span`
  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 0.5);
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
