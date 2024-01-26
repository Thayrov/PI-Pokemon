import {useState, useEffect} from 'react';
import {Wrapper} from '../styles/Title.styles';

const Title = () => {
  const [xPosition, setXPosition] = useState('50%');

  const updateXPosition = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 320) setXPosition('40%');
    if (screenWidth >= 768) setXPosition('45%');
    if (screenWidth >= 1024) setXPosition('50%');
    if (screenWidth >= 1280) setXPosition('50%');
  };

  useEffect(() => {
    window.addEventListener('resize', updateXPosition);
    updateXPosition();

    return () => {
      window.removeEventListener('resize', updateXPosition);
    };
  }, []);

  return (
    <Wrapper>
      <svg>
        <text x={xPosition} y='50%' dy='.35em' textAnchor='end'>
          Pokemon
        </text>
      </svg>
    </Wrapper>
  );
};

export default Title;
