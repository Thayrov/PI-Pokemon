import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 0.4);
  border-radius: 10px;
`;
export const FooterText = styled.h2`
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  text-align: center;
  font-size: 16px;
  padding: 4px;
`;
