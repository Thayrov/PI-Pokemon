import styled, {css} from 'styled-components';

/* ############## BASE THEME ############## */

// eslint-disable-next-line
export const theme = {
  //  https://coolors.co/ef594f-ffd740-0a60af-f6f7f8-e2e3e4-40413f-3d3d3c-302d2d
  colors: {
    Bittersweet: '239, 89, 79',
    Mustard: '255, 215, 64',
    Turquoise: '10, 96, 175',
    SeaSalt: '246, 247, 248',
    Platinum: '226, 227, 228',
    BlackOlive: '64, 65, 63',
    Onyx: '61, 61, 60',
    Jet: '48, 45, 45',
  },
  breakpoints: {
    'mobile': '576px',
    'tablet': '768px',
    'desktop': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
    '3xl': '1920px',
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
  font-weight: bold;
  color: #ef594f !important;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  padding: 4px 11px 4px 10px;
  border-radius: 5px;
  border: 1px solid #ef594f;
  background: #302d2d;
  box-shadow: 2px 2px 6px #302d2d;
  animation: SlideTop 1s ease 0s infinite alternate none;

  @keyframes SlideTop {
    0% {
      transform: translateY(2px);
    }

    100% {
      transform: translateY(-2px);
    }
  }

  &:hover {
    background: #e2e3e4;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const BaseInput = styled.input``;
