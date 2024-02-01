import {useState} from 'react';
import {CustomInputContainer, Input, SvgIcon} from '../styles/SearchBar.styles';
import {useDispatch} from 'react-redux';
import {getPokemonById, getPokemonByName} from '../redux/actions';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearchSubmit = e => {
    e.preventDefault(); // Prevent the default form submit action
    const term = searchTerm.trim();

    if (term.match(/^[0-9]+$/)) {
      dispatch(getPokemonById(term));
    } else if (term !== '') {
      dispatch(getPokemonByName(term));
    }
  };
  return (
    <CustomInputContainer onSubmit={handleSearchSubmit}>
      <SvgIcon onClick={handleSearchSubmit} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
        <path d='M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z'></path>
        <path d='M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.040.030.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.100-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z'></path>
      </SvgIcon>
      <Input
        type='text'
        placeholder='Insert name or ID'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        autoComplete='off'
      />
    </CustomInputContainer>
  );
};

export default SearchBar;
