import {ToastContainer, ToastDesc, ToastImg} from '../styles/Toast.styles';

const Toast = ({show, message}) => {
  return (
    <ToastContainer $show={show ? 'true' : 'false'}>
      <ToastImg>
        <img
          src='https://res.cloudinary.com/dhjlbf6xs/image/upload/v1705537375/pokemon/bg/White_Wallpaper_jcu1le.png'
          alt='icon'
          style={{width: '50px', height: '50px', borderRadius: '50%'}}
        />
      </ToastImg>
      <ToastDesc>{message}</ToastDesc>
    </ToastContainer>
  );
};

export default Toast;
