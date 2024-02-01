import {
  ButtonsWrapper,
  HomeWrapper,
  SearchBarWrapper,
  SelectContainer,
} from '../styles/Home.styles';
import Button from './Button';
import Cards from './Cards';
import SearchBar from './SearchBar';
import CustomSelect from './Select';
import Title from './Title';
import {TooltipContainer, TooltipText} from '../styles/Tooltip.styles';
import {Footer} from './Footer';
import {GoBackButton} from './GoBackButton';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ResetButton} from './ResetButton';
import {
  filterByAbility,
  filterByDoubleDamageFrom,
  filterByDoubleDamageTo,
  filterByHalfDamageFrom,
  filterByHalfDamageTo,
  filterByNoDamageFrom,
  filterByNoDamageTo,
  filterBySource,
  filterByType,
  getPokemons,
  sortPokemonsByAttack,
  sortPokemonsByDefense,
  sortPokemonsByHP,
  sortPokemonsByHeight,
  sortPokemonsById,
  sortPokemonsByName,
  sortPokemonsBySpecialAttack,
  sortPokemonsBySpecialDefense,
  sortPokemonsBySpeed,
  sortPokemonsByWeight,
} from '../redux/actions';
import {Pagination} from './Pagination';
import {useNavigate} from 'react-router-dom';
import Loader from './Loader';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenForm = () => {
    navigate('/form');
  };

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const pokemons = useSelector(state => state.filteredPokemons);

  const isFiltered = useSelector(state => {
    return state.filteredPokemons.length < state.pokemons.length && state.pokemons.length > 0;
  });

  const totalItems = isFiltered ? pokemons.length : 908;

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPokemons(currentPage, pageSize)).finally(() => {
      setIsLoading(false);
    });
  }, [currentPage, pageSize, dispatch]);

  useEffect(() => {
    if (isFiltered) {
      setCurrentPage(1);
    }
  }, [isFiltered]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, pokemons.length);

  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedSorter, setSelectedSorter] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedSorterSubcategory, setSelectedSorterSubcategory] = useState('');

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    setSelectedSubcategory('placeholder');
  };
  const handleSorterChange = sorter => {
    setSelectedSorter(sorter);
    setSelectedSorterSubcategory('placeholder');
  };
  const typesFromStore = useSelector(state => state.types);
  const abilitiesFromStore = useSelector(state => state.abilities);

  let secondSelectContent;
  switch (selectedFilter) {
    case 'Types':
      secondSelectContent = typesFromStore.map(type => type.name);
      break;
    case 'Abilities':
      secondSelectContent = abilitiesFromStore;
      break;
    case 'Source':
      secondSelectContent = ['API', 'DB'];
      break;
    case 'Weak':
      secondSelectContent = typesFromStore.map(type => type.name);
      break;
    case 'Effective':
      secondSelectContent = typesFromStore.map(type => type.name);
      break;
    case 'Resistant':
      secondSelectContent = typesFromStore.map(type => type.name);
      break;
    case 'LessEffective':
      secondSelectContent = typesFromStore.map(type => type.name);
      break;
    case 'Immune':
      secondSelectContent = typesFromStore.map(type => type.name);
      break;
    case 'Ineffective':
      secondSelectContent = typesFromStore.map(type => type.name);
      break;

    default:
      secondSelectContent = [];
  }

  const filterOptions = [
    'Types',
    'Abilities',
    'Source',
    'Weak',
    'Effective',
    'Resistant',
    'LessEffective',
    'Immune',
    'Ineffective',
  ];

  const sortOptions = [
    'ID',
    'Name',
    'HP',
    'Attack',
    'Special Attack',
    'Defense',
    'Special Defense',
    'Speed',
    'Height',
    'Weight',
  ];

  const sorters = ['Ascending', 'Descending'];

  const handleSubcategoryChange = subcategory => {
    setSelectedSubcategory(subcategory);
    switch (selectedFilter) {
      case 'Types':
        dispatch(filterByType(subcategory));
        break;
      case 'Abilities':
        dispatch(filterByAbility(subcategory));
        break;
      case 'Source':
        dispatch(filterBySource(subcategory));
        break;
      case 'Weak':
        dispatch(filterByDoubleDamageFrom(subcategory));
        break;
      case 'Effective':
        dispatch(filterByDoubleDamageTo(subcategory));
        break;
      case 'Resistant':
        dispatch(filterByHalfDamageTo(subcategory));
        break;
      case 'LessEffective':
        dispatch(filterByHalfDamageFrom(subcategory));
        break;
      case 'Immune':
        dispatch(filterByNoDamageTo(subcategory));
        break;
      case 'Ineffective':
        dispatch(filterByNoDamageFrom(subcategory));
        break;

      default:
        break;
    }
  };
  const handleSorterSubcategoryChange = subcategory => {
    setSelectedSorterSubcategory(subcategory);
    switch (selectedSorter) {
      case 'ID':
        dispatch(sortPokemonsById(subcategory));
        break;
      case 'Name':
        dispatch(sortPokemonsByName(subcategory));
        break;
      case 'HP':
        dispatch(sortPokemonsByHP(subcategory));
        break;
      case 'Attack':
        dispatch(sortPokemonsByAttack(subcategory));
        break;
      case 'Special Attack':
        dispatch(sortPokemonsBySpecialAttack(subcategory));
        break;
      case 'Defense':
        dispatch(sortPokemonsByDefense(subcategory));
        break;
      case 'Special Defense':
        dispatch(sortPokemonsBySpecialDefense(subcategory));
        break;
      case 'Speed':
        dispatch(sortPokemonsBySpeed(subcategory));
        break;
      case 'Height':
        dispatch(sortPokemonsByHeight(subcategory));
        break;
      case 'Weight':
        dispatch(sortPokemonsByWeight(subcategory));
        break;
      default:
        break;
    }
  };

  return (
    <HomeWrapper>
      <Title />
      <SearchBarWrapper>
        <SearchBar />
        <SelectContainer>
          <CustomSelect
            firsttext={'Choose filter'}
            secondtext={'Filters'}
            firstcontent={filterOptions}
            secondcontent={secondSelectContent}
            onFirstSelectChange={handleFilterChange}
            onSecondSelectChange={handleSubcategoryChange}
            keyValue={selectedFilter}
          />
          <CustomSelect
            firsttext={'Choose sorter'}
            secondtext={'Sorters'}
            firstcontent={sortOptions}
            secondcontent={sorters}
            onFirstSelectChange={handleSorterChange}
            onSecondSelectChange={handleSorterSubcategoryChange}
            keyValue={selectedSorter}
          />
        </SelectContainer>
        <TooltipContainer onClick={handleOpenForm}>
          <Button>+</Button>
          <TooltipText>Create</TooltipText>
        </TooltipContainer>
      </SearchBarWrapper>
      {isLoading ? <Loader /> : <Cards startIndex={startIndex} endIndex={endIndex} />}

      <Pagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
      <ButtonsWrapper>
        <ResetButton />
        <GoBackButton />
      </ButtonsWrapper>
      <Footer />
    </HomeWrapper>
  );
};

export default Home;
