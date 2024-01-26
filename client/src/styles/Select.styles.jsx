import styled from 'styled-components';

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: #f6f7f8;
  border: 1px solid #ef594f;
  border-radius: 5px;
  color: #302d2d;
  cursor: pointer;
  outline: none;
  box-shadow: 2px 2px 6px 1px #40413f;

  &:focus {
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
  background-color: #302d2d;
  clip-path: polygon(50% 80%, 0 20%, 100% 20%);
`;
