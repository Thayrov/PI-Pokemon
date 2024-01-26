import styled from 'styled-components';
export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 500px;
  max-width: 600px;
  min-width: 300px;
  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    width: 800px;
    max-width: 900px;
    min-width: 700px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    width: 1150px;
    max-width: 1200px;
    min-width: 1100px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.xl}) {
    max-width: 100%;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  height: 50px;
  width: auto;
  padding: 8px 10px;
  border-radius: 10px;
  background-color: rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7);
  justify-content: space-between;
  gap: 20px;
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 10px;
`;
