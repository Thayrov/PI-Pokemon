import styled from 'styled-components';
import {BaseButton} from './Base.styles';

export const StyledButton = styled(BaseButton)`
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
`;
