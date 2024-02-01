import styled from 'styled-components';
export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 95%;
  max-width: 400px;
  min-width: 300px;
  gap: 20px;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    max-width: 500px;
    min-width: 400px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    max-width: 700px;
    min-width: 600px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    max-width: 900px;
    min-width: 800px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.xl}) {
    max-width: 100%;
    min-width: 100%;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
  background-color: rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7);
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    gap: 20px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    flex-wrap: nowrap;
    gap: 10px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    flex-wrap: nowrap;
    gap: 20px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 10px;
  order: 3;
  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    order: 2;
    max-width: 460px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    max-width: 540px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
