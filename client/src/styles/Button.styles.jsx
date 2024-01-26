import styled from 'styled-components';

export const StyledButton = styled.button`
  font-weight: bold;
  color: #ef594f !important;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  padding: 4px 14px 4px 10px;
  border-radius: 5px;
  border: 1px solid #ef594f;
  background: #f6f7f8;
  box-shadow: 2px 2px 6px #302d2d;

  &:hover {
    background: #e2e3e4;
  }

  &:active {
    transform: scale(0.9);
  }
`;
