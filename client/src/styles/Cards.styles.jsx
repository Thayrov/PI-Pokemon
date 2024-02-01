import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  min-height: 30rem;
  padding: 20px;
  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 0.4);
  border-radius: 10px;
  overflow-y: scroll;
`;
