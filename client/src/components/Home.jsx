import {HomeWrapper, SearchBarWrapper, SelectContainer} from '../styles/Home.styles';
import Button from './Button';
import Cards from './Cards';
import SearchBar from './SearchBar';
import CustomSelect from './Select';
import Title from './Title';
import {TooltipContainer, TooltipText} from '../styles/Tooltip.styles';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {BaseButton} from '../styles/Base.styles';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return <BaseButton onClick={handleButtonClick}>Go back</BaseButton>;
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 Thayrov. Released under the MIT License.</FooterText>
    </FooterContainer>
  );
};
const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  background-color: rgba(${({theme: {colors}}) => colors.Jet}, 0.4);
  border-radius: 10px;
`;
const FooterText = styled.h2`
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  text-align: center;
  font-size: 16px;
  padding: 4px;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Title />
      <SearchBarWrapper>
        <SearchBar />
        <SelectContainer>
          <CustomSelect firsttext={'Choose filter'} secondtext={'Filters'} />
          <CustomSelect firsttext={'Choose sorter'} secondtext={'Sorters'} />
        </SelectContainer>
        <TooltipContainer>
          <Button>+</Button>
          <TooltipText>Create</TooltipText>
        </TooltipContainer>
      </SearchBarWrapper>
      <Cards />
      <GoBackButton />
      <Footer />
    </HomeWrapper>
  );
};

export default Home;
