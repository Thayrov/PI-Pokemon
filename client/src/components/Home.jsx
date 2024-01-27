import {HomeWrapper, SearchBarWrapper, SelectContainer} from '../styles/Home.styles';
import Button from './Button';
import Cards from './Cards';
import SearchBar from './SearchBar';
import CustomSelect from './Select';
import Title from './Title';
import {TooltipContainer, TooltipText} from '../styles/Tooltip.styles';

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
    </HomeWrapper>
  );
};

export default Home;
