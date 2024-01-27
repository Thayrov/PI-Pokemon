import styled from 'styled-components';

export const TooltipText = styled.span`
  height: 1.6rem;

  font-size: 12px;
  font-weight: bold;
  visibility: hidden;
  width: 4rem;
  background-color: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  text-align: center;
  border-radius: 6px;
  padding: 4px;
  position: absolute;
  z-index: 1;
  top: 0%;
  left: -180%;
  margin-left: -20px;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    height: 2.1rem;
    font-size: 16px;
    width: 5rem;
    order: 3;
    top: 0%;
    left: -100%;
    margin-left: -60px;
    padding: 4px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    width: 6rem;
    top: 0%;
    left: -150%;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    font-size: 18px;
    width: 6rem;
    top: 0%;
    left: -135%;
  }
  /* Tooltip arrow */
  &::after {
    content: '';
    position: absolute;
    top: 25%;
    right: -17%;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent transparent
      rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
    @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
      top: 30%;
      right: -17%;
    }
    @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
      top: 30%;
      right: -12%;
      border-width: 6px;
    }
  }
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${TooltipText} {
    visibility: visible;
  }

  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    order: 3;
  }
`;
