import {useNavigate} from 'react-router-dom';
import {BaseButton} from '../styles/Base.styles';

export const GoBackButton = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  };

  return <BaseButton onClick={handleButtonClick}>Go back</BaseButton>;
};
