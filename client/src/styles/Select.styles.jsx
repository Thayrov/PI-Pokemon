import styled from 'styled-components';

export const DoubleSelectContainer = styled.div`
  display: flex;
`;

export const SelectWrapper1 = styled.div`
  position: relative;
  display: flex;
  flex: 1.2;
`;
export const SelectWrapper2 = styled.div`
  position: relative;
  display: flex;
  flex: 0.8;
`;

export const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  font-size: 11px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: #302d2d;
  border: 1px solid #ef594f;
  border-radius: 5px;
  color: #f6f7f8;
  cursor: pointer;
  outline: none;
  box-shadow: 2px 2px 6px 1px #40413f;
  font-variant: small-caps;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 15px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    font-size: 13px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    font-size: 17px;
  }
  &:focus {
    color: #302d2d;
    background: #e2e3e4;
    border: 2px solid #ef594f;
    border-radius: 5px;
  }
`;

export const SelectArrow = styled.div`
  content: '';
  position: absolute;
  pointer-events: none;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  width: 12px;
  height: 12px;
  background-color: #e2e3e4;
  clip-path: polygon(50% 80%, 0 20%, 100% 20%);
`;
