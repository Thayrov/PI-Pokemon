import styled, {keyframes} from 'styled-components';

export const fadein = keyframes`
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
`;

export const expand = keyframes`
  from {min-width: 50px} 
  to {min-width: 350px}
`;

export const stay = keyframes`
  from {min-width: 350px} 
  to {min-width: 350px}
`;

export const shrink = keyframes`
  from {min-width: 350px;} 
  to {min-width: 50px;}
`;

export const fadeout = keyframes`
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 60px; opacity: 0;}
`;

export const ToastContainer = styled.div`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  max-width: 500px;
  min-width: 50px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  position: fixed;
  z-index: 1000;
  top: 30px;
  right: 30px;
  font-size: 17px;
  padding: 16px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadein} 0.5s, ${expand} 0.5s 0.5s, ${stay} 3s 1s, ${shrink} 0.5s 4s,
    ${fadeout} 0.5s 4.5s;
`;

export const ToastImg = styled.div`
  width: 50px;
  height: 50px;
  float: left;
  box-sizing: border-box;
  background-color: #111;
  color: #fff;
  border-radius: 50%;
`;

export const ToastDesc = styled.div`
  color: #fff;
  padding: 16px;
  overflow: hidden;
  white-space: nowrap;
`;
