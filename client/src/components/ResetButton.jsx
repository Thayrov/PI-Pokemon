import {BaseButton} from '../styles/Base.styles';
import {reset} from '../redux/actions';
import {useDispatch} from 'react-redux';

export const ResetButton = () => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(reset());
  };

  return <BaseButton onClick={handleButtonClick}>Reset</BaseButton>;
};
