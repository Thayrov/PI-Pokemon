import styled from 'styled-components';

export const StyledButton = styled.button`
  font-weight: bold;
  color: #ef594f !important;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  padding: 4px 11px 4px 10px;
  border-radius: 5px;
  border: 1px solid #ef594f;
  background: #302d2d;
  box-shadow: 2px 2px 6px #302d2d;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 18px;
    padding: 4px 12px 4px 10px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    order: 3;
    padding: 4px 10px 4px 10px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    padding: 4px 12px 4px 10px;
  }
  animation: SlideTop 1s ease 0s infinite alternate none;
  @keyframes SlideTop {
    0% {
      transform: translateY(2px);
    }

    100% {
      transform: translateY(-2px);
    }
  }

  &:hover {
    background: #e2e3e4;
  }

  &:active {
    transform: scale(0.9);
  }
`;
