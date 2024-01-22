import styled from 'styled-components';

export const Pokemon = styled.div`
  width: 200px;
  height: 200px;
  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  border-radius: 30px;
  position: relative;
  font-size: 200px;
  line-height: 200px;
  display: inline-block;
  margin-bottom: 20px;
  animation: Shake 3s ease-in-out 1s infinite normal none;

  @keyframes Shake {
    0%,
    100% {
      transform: rotate(0deg);
      transform-origin: 50% 100%;
    }

    10% {
      transform: rotate(2deg);
    }

    20%,
    40%,
    60% {
      transform: rotate(-4deg);
    }

    30%,
    50%,
    70% {
      transform: rotate(4deg);
    }

    80% {
      transform: rotate(-2deg);
    }

    90% {
      transform: rotate(2deg);
    }
  }

  &::before {
    content: '';
    width: 200px;
    height: 75px;
    background-color: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
    display: block;
    border-radius: 30px 30px 0 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  &::after {
    content: '';
    width: 200px;
    height: 96px;
    background-color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
    display: block;
    border-radius: 0 0 30px 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    box-shadow: inset 0px -20px 0px 0px rgba(${({theme: {colors}}) => colors.Platinum}, 1);
  }

  i::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 44px;
    width: 44px;
    border-radius: 44px;
    background-color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
    z-index: 2;
    margin: -41px 0 0 -41px;
    border: 18px solid rgba(${({theme: {colors}}) => colors.Jet}, 1);
    animation: pulseAnimation 3s infinite ease-in-out;
  }
  @keyframes pulseAnimation {
    0% {
      background-color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
    }
    50% {
      background-color: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
    }
    100% {
      background-color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
    }
  }
`;

export const ButtonBackground = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: repeating-linear-gradient(
    -45deg,
    rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7),
    rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7) 5px,
    rgba(${({theme: {colors}}) => colors.Jet}, 0.7) 5px,
    rgba(${({theme: {colors}}) => colors.Jet}, 0.7) 25px
  );
`;

export const ButtonInfo = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-family: 'system-ui';
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  font-size: 3em;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);

  @media (min-width: ${({theme: {breakpoints}}) => breakpoints.tablet}) {
    font-size: 3.5em;
  }
`;

export const ButtonMention = styled.div`
  margin-bottom: 70px;
  text-align: center;
  font-family: 'system-ui';
  letter-spacing: 0.1em;
  font-size: 1.1em;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);

  span {
    font-size: 1.2em;
    font-weight: 600;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ButtonWrapper = styled.div`
  margin: 0 30px 30px 30px;
  display: block;
`;

export const StyledButton = styled.button`
  border: 5px solid rgba(${({theme: {colors}}) => colors.Jet}, 1);
  border-radius: 5px;
  background: transparent;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  overflow: visible;
  outline: none;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  position: relative;
  letter-spacing: 0.1em;
  font-weight: 400;
  padding: 1rem 3rem 1rem 3rem;
  text-transform: uppercase;
  font-family: 'system-ui';
  font-size: 1.5em;

  &:hover {
    border-width: 5px 0 5px 0;
    background: rgba(${({theme: {colors}}) => colors.Jet}, 1);
    transition: 0.3s ease all;

    .pokemon-ball::before {
      transform: translate3d(0, -100%, 0);
      transition: transform 0.25s cubic-bezier(0.2, 1, 0.3, 1);
      border-radius: 30px 30px 0 0;
    }

    .pokemon-ball::after {
      transform: translate3d(0, 100%, 0);
      transition: transform 0.25s cubic-bezier(0.2, 1, 0.3, 1);
      border-radius: 0 0 30px 30px;
    }

    a {
      transition: none;
      color: transparent;
      z-index: 999;
    }

    a::before {
      transform: translate3d(100%, 0, 0);
    }

    a span:first-child::before,
    a span:nth-child(2)::before {
      transition-delay: 0.3s;
      transform: translate3d(0, 0, 0);
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    }
  }
`;

export const PokemonBall = styled.div`
  position: absolute;
  content: 'Go!';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;

  &::before,
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
    transform: translate3d(0, 0, 0);
    transition: transform 0.25s;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }

  &::after {
    top: 50%;
    background: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  }
`;

export const StyledLink = styled.a`
  color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  font-weight: 600;
  font-size: 1.5em;
  transition: color 0.5s 0.25s;
  overflow: hidden;
  display: inline-block;
  position: relative;
  z-index: 999;
  text-decoration: none;
`;

export const LetterSpan = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  top: ${({top}) => top};
  left: 0;
  overflow: hidden;

  &::before {
    position: absolute;
    content: attr(data-letters);
    left: 0;
    width: 100%;
    color: ${({color}) => color};
    transition: transform 0.5s;
    transform: translate3d(0, ${({transform}) => transform}, 0);
  }
`;
