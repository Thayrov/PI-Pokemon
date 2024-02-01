import styled from 'styled-components';

export const CustomInputContainer = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  width: 180px;
  max-width: 60rem;
  flex-grow: 1;
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    min-width: 13rem;
  }
`;

export const Input = styled.input`
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  width: 100%;
  padding-right: 10px;
  outline: none;
  background: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  border: 1px solid rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px rgba(${({theme: {colors}}) => colors.BlackOlive}, 1);
  transition: 0.3s ease;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 18px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    font-size: 15px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    font-size: 18px;
  }

  &:focus {
    color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
    background: rgba(${({theme: {colors}}) => colors.Platinum}, 1);
    border: 2px solid rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
    border-radius: 10px;
  }

  &::placeholder {
    color: rgba(${({theme: {colors}}) => colors.Platinum}, 1);
  }
`;

export const SvgIcon = styled.svg`
  position: absolute;
  right: 18px;
  fill: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  width: 18px;
  height: 18px;
  cursor: pointer;

  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    right: 10px;
  }

  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    right: 18px;
  }

  &:hover {
    stroke: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  }

  &:active {
    transform: scale(0.9);
  }
`;
