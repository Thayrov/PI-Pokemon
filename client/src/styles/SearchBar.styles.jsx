import styled from 'styled-components';

export const CustomInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 100%;
`;

export const Input = styled.input`
  font-size: 18px;
  font-weight: bold;
  padding: 5px 10px;
  width: 100%;
  padding-right: 10px;
  outline: none;
  background: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  border: 1px solid rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  border-radius: 5px;
  box-shadow: 2px 2px 6px 1px rgba(${({theme: {colors}}) => colors.BlackOlive}, 1);
  transition: 0.3s ease;

  &:focus {
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
  right: 35px;
  fill: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  width: 18px;
  height: 18px;
`;
