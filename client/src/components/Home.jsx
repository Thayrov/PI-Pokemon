import {HomeWrapper, SearchBarWrapper, SelectContainer} from '../styles/Home.styles';
import Button from './Button';
import SearchBar from './SearchBar';
import CustomSelect from './Select';
import Title from './Title';

const Home = () => {
  return (
    <HomeWrapper>
      <Title />
      <SearchBarWrapper>
        <SearchBar />
        <SelectContainer>
          <CustomSelect />
          <CustomSelect />
        </SelectContainer>
        <Button>+</Button>
      </SearchBarWrapper>
    </HomeWrapper>
  );
};

export default Home;
