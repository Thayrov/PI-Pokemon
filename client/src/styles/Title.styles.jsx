import styled, {keyframes} from 'styled-components';

const strokeAnimation = keyframes`
  0%   {
    fill: #ef594f00; 
    stroke: #ffd740;
    stroke-dashoffset: 25%; 
    stroke-dasharray: 0 50%; 
    stroke-width: 1;
  }
  70%  {
    fill: #ef594f20; 
    stroke: #ffd740; 
}
  80%  {
    fill: #ef594f50; 
    stroke: #ffd740; 
    stroke-width: 1; 
  }
  100% {
    fill: #ef594f; 
    stroke: #ffd74010;
    stroke-dashoffset: -25%; 
    stroke-dasharray: 50% 0; 
    stroke-width: 0;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
    height: 100%;
    text {
      animation: ${strokeAnimation} 5s 1;
      fill: #ef594f;
      stroke-width: 1;
      font-size: 56px;
      font-weight: 700;
      text-align: start;
      text-justify: start;
      transition: 0.3s ease all;
      @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
        font-size: 60px;
      }
      @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
        font-size: 80px;
      }
    }
  }
`;
