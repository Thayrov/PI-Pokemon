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

export const Landing = () => (
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
        <StyledButton>
          <PokemonBall className='pokemon-ball'></PokemonBall>
          <StyledLink>
            Pokemon
            <LetterSpan top='0' color='#ef594f' transform='100%' data-letters='Go!'></LetterSpan>
            <LetterSpan top='5%' color='#f6f7f8' transform='-100%' data-letters='Go!'></LetterSpan>
          </StyledLink>
        </StyledButton>
      </ButtonWrapper>
    </ButtonGroup>
  </ButtonBackground>
);
