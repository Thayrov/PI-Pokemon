import {Wrapper} from '../styles/Title.styles';

const Title = () => {
  return (
    <Wrapper>
      <svg>
        <text x='50%' y='50%' dy='.35em' textAnchor='middle'>
          - National Pokedex -
        </text>
      </svg>
    </Wrapper>
  );
};

export default Title;
