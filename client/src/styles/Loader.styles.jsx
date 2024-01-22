import styled, {keyframes} from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLoader = styled.div`
  position: relative;
  height: 110px;
  width: 110px;
  background: linear-gradient(
    to bottom,
    rgba(${({theme: {colors}}) => colors.Bittersweet}, 1) 50%,
    rgba(${({theme: {colors}}) => colors.SeaSalt}, 1) 50%
  );
  border-radius: 50%;
  border: 8px solid rgba(${({theme: {colors}}) => colors.Jet}, 1);
  animation: ${spin} 1.5s linear infinite;

  &::before {
    content: '';
    position: absolute;
    height: 8px;
    width: 100px;
    background: rgba(${({theme: {colors}}) => colors.Jet}, 1);
    top: 50px;
    transform: translatey(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    height: 38px;
    width: 38px;
    border-radius: 50%;
    background: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
    top: 48px;
    left: 48px;
    transform: translate(-50%, -50%);
    box-shadow: inset 0 0 0 8px rgba(${({theme: {colors}}) => colors.Jet}, 1),
      inset 0 0 0 10px rgba(${({theme: {colors}}) => colors.SeaSalt}, 1),
      inset 0 0 0 12px rgba(${({theme: {colors}}) => colors.Jet}, 1);
  }
`;
