import {
  ButtonBackground,
  ButtonGroup,
  ButtonInfo,
  ButtonMention,
  ButtonWrapper,
  LetterSpan,
  Pokemon,
  PokemonBall,
  StyledButton,
  StyledLink,
} from '../styles/Landing.styles';
import {useNavigate} from 'react-router-dom';
import Loader from './Loader';
import {useState} from 'react';

export const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <ButtonBackground>
      <Pokemon>
        <i></i>
      </Pokemon>
      <ButtonInfo>¡Bienvenido!</ButtonInfo>
      <ButtonMention>
        <span>Presiona para empezar:</span>
      </ButtonMention>
      <ButtonGroup>
        <ButtonWrapper>
          <StyledButton onClick={handleButtonClick}>
            <PokemonBall className='pokemon-ball'></PokemonBall>
            <StyledLink>
              Pokemon
              <LetterSpan top='0' color='#ef594f' transform='100%' data-letters='Go!'></LetterSpan>
              <LetterSpan
                top='5%'
                color='#f6f7f8'
                transform='-100%'
                data-letters='Go!'></LetterSpan>
            </StyledLink>
          </StyledButton>
        </ButtonWrapper>
      </ButtonGroup>
    </ButtonBackground>
  );
};
