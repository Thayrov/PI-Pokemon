import styled, {css, keyframes} from 'styled-components';

/* ############## BASE THEME ############## */

export const theme = {
  //  https://coolors.co/831010-c52941-e63931-ff5220-d58394-f6a48b-ffffff-cdcdde-a49c9c-5a5252
  ouCrimson: '131, 16, 16',
  cardinal: '197, 41, 65',
  vermilion: '230, 57, 49',
  giantsOrange: '255, 82, 32',
  puce: '213, 131, 148',
  atomicTangerine: '246, 164, 139',
  white: '255, 255, 255',
  lavenderWeb: '205, 205, 222',
  taupeGray: '164, 156, 156',
  wenge: '90, 82, 82',
};

/* ############## BASE FUNCTIONS ############## */

export const borderStyle = thickness => css`
  border: ${thickness}px solid rgba(${props => props.theme.yellow_green}, 0.8);
`;

export const themeColor = (color, opacity) => css`
  color: rgba(${props => props.theme[color]}, ${opacity});
`;

export const themeBackgroundColor = (color, opacity) => css`
  background-color: rgba(${props => props.theme[color]}, ${opacity});
`;

export const boxShadow = (x, y, blur, spread, color, opacity) => css`
  box-shadow: ${x}px ${y}px ${blur}px ${spread}px rgba(${props => props.theme[color]}, ${opacity});
`;

export const imageBase = (w, h) => css`
  width: ${w}px;
  height: ${h}px;
  border-radius: 50%;
  ${borderStyle(3)};
  object-fit: cover;
`;

/* ############## BASE STYLES ############## */

export const FlexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexColumnCenter = css`
  ${FlexCenter};
  flex-direction: column;
`;

/* ############## BASE COMPONENTS ############## */

export const BaseButton = styled.button`
  &:hover {
  }
`;

export const BaseInput = styled.input``;

/* ############## ANIMATIONS ############## */
