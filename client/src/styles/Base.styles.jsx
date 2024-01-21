import styled, {css} from 'styled-components';

/* ############## BASE THEME ############## */

// eslint-disable-next-line
export const theme = {
  //  https://coolors.co/ef594f-ffd740-f6f7f8-e2e3e4-40413f-3d3d3c-302d2d
  colors: {
    Bittersweet: '239, 89, 79',
    Mustard: '255, 215, 64',
    SeaSalt: '246, 247, 248',
    Platinum: '226, 227, 228',
    BlackOlive: '64, 65, 63',
    Onyx: '61, 61, 60',
    Jet: '48, 45, 45',
  },
  breakpoints: {
    'mobile': '320px',
    'tablet': '768px',
    'desktop': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
};

/* ############## BASE FUNCTIONS ############## */

// eslint-disable-next-line
export const borderStyle = (thickness, color, opacity) => css`
  border: ${thickness}px solid rgba(${({theme: {colors}}) => colors[color]}, ${opacity});
`;

// eslint-disable-next-line
export const themeColor = (color, opacity) => css`
  color: rgba(${({theme: {colors}}) => colors[color]}, ${opacity});
`;

// eslint-disable-next-line
export const themeBackgroundColor = (color, opacity) => css`
  background-color: rgba(${({theme: {colors}}) => colors[color]}, ${opacity});
`;

// eslint-disable-next-line
export const boxShadow = (x, y, blur, spread, color, opacity) => css`
  box-shadow: ${x}px ${y}px ${blur}px ${spread}px
    rgba(${({theme: {colors}}) => colors[color]}, ${opacity});
`;

// eslint-disable-next-line
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
