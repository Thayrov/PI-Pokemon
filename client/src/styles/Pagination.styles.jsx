import styled from 'styled-components';

export const PaginationContainer = styled.div`
  text-align: center;
  background-color: rgba(${({theme: {colors}}) => colors.BlackOlive}, 0.7);
  padding: 8px 10px;
  border-radius: 10px;
  width: 100%;
`;

export const PaginationList = styled.ul`
  list-style: none;
  padding: 0;
  display: inline-block;
  border-radius: 5px;
  border: 1px solid rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);

  box-shadow: 2px 2px 6px 1px rgba(${({theme: {colors}}) => colors.BlackOlive}, 1);
  background: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  max-width: calc(100% - 10px);
  height: 1.65rem;
  @media (min-width: ${({theme}) => theme.breakpoints.xl}) {
    & > li:nth-child(3) {
      margin-left: 10rem;
    }

    & > li:nth-last-child(3) {
      margin-right: 10rem;
    }
  }
`;

export const PaginationItem = styled.li`
  display: inline;
  margin: 0 3px;
  @media (min-width: ${({theme}) => theme.breakpoints.mobile}) {
    margin: 0 3px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.tablet}) {
    margin: 0 1px;
  }
  @media (min-width: ${({theme}) => theme.breakpoints.desktop}) {
    margin: 0 7.6px;
  }
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &.active a {
    border-radius: 10px;
    background: rgba(${({theme: {colors}}) => colors.Platinum}, 1);
    color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  }
`;

export const PaginationLink = styled.a`
  cursor: pointer;
  padding: 5px 10px;
  transition: 0.3s ease;
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  border-radius: 5px;

  &:hover {
    background: rgba(${({theme: {colors}}) => colors.Platinum}, 1);
    color: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  }
`;
