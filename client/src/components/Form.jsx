import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import Toast from './Toast';
import {GoBackButton} from './GoBackButton';
import {
  ErrorMsg,
  FormContainer,
  FormField,
  Label,
  SubmitButton,
  Form,
  Input,
  Select,
  FormTitle,
} from '../styles/Form.styles';
import {getPokemonByName} from '../redux/actions';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const PokemonForm = () => {
  const types = useSelector(state => state.types);
  const abilities = useSelector(state => state.abilities);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const dispatch = useDispatch();

  const displayToast = message => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    special_attack: '',
    defense: '',
    special_defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
    abilities: [],
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) {
      tempErrors.name = 'Name is required.';
    } else if (/[^a-zA-Z\s]/.test(formData.name)) {
      tempErrors.name = 'Name must only contain letters.';
    }

    if (!formData.image) {
      tempErrors.image = 'Image is required.';
    }

    const numericFields = [
      'hp',
      'attack',
      'defense',
      'special_attack',
      'special_defense',
      'speed',
      'height',
      'weight',
    ];
    numericFields.forEach(field => {
      if (!formData[field]) {
        tempErrors[field] = `${field} is required.`;
      } else if (isNaN(formData[field]) || formData[field] < 0 || formData[field] > 100) {
        tempErrors[field] = `${field} must be a number between 0 and 100.`;
      }
    });

    if (!formData.types || formData.types.length === 0) {
      tempErrors.types = 'Must select at least one type.';
    }

    if (!formData.abilities || formData.abilities.length === 0) {
      tempErrors.abilities = 'Must select at least one ability.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = e => {
    if (e.target.name === 'abilities' || e.target.name === 'types') {
      const arrayValues = e.target.value.split(',').map(item => item.trim());
      setFormData({...formData, [e.target.name]: arrayValues});
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post(`${VITE_API_URL}/pokemons`, formData);
        displayToast('Pokemon created successfully!');
        setFormData({
          name: '',
          image: '',
          hp: '',
          attack: '',
          special_attack: '',
          defense: '',
          special_defense: '',
          speed: '',
          height: '',
          weight: '',
          types: [],
          abilities: [],
        });
        setErrors({});
        dispatch(getPokemonByName(formData.name));
      } catch (error) {
        displayToast('Error creating the Pokemon.');
      }
    } else {
      displayToast('Please correct the form errors.');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Create your pokemon</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor='name'>Name:</Label>
          <Input id='name' name='name' value={formData.name} onChange={handleChange} />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='image'>Image:</Label>
          <Input id='image' name='image' value={formData.image} onChange={handleChange} />
          {errors.image && <ErrorMsg>{errors.image}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='hp'>Hp:</Label>
          <Input id='hp' name='hp' type='number' value={formData.hp} onChange={handleChange} />
          {errors.hp && <ErrorMsg>{errors.hp}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='attack'>Attack:</Label>
          <Input
            id='attack'
            name='attack'
            type='number'
            value={formData.attack}
            onChange={handleChange}
          />
          {errors.attack && <ErrorMsg>{errors.attack}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='special_attack'>Special Attack:</Label>
          <Input
            id='special_attack'
            name='special_attack'
            type='number'
            value={formData.special_attack}
            onChange={handleChange}
          />
          {errors.special_attack && <ErrorMsg>{errors.special_attack}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='defense'>Defensa:</Label>
          <Input
            id='defense'
            name='defense'
            type='number'
            value={formData.defense}
            onChange={handleChange}
          />
          {errors.defense && <ErrorMsg>{errors.defense}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='special_defense'>Special Defense:</Label>
          <Input
            id='special_defense'
            name='special_defense'
            type='number'
            value={formData.special_defense}
            onChange={handleChange}
          />
          {errors.special_defense && <ErrorMsg>{errors.special_defense}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='speed'>Speed:</Label>
          <Input
            id='speed'
            name='speed'
            type='number'
            value={formData.speed}
            onChange={handleChange}
          />
          {errors.speed && <ErrorMsg>{errors.speed}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='height'>Height:</Label>
          <Input
            id='height'
            name='height'
            type='number'
            value={formData.height}
            onChange={handleChange}
          />
          {errors.height && <ErrorMsg>{errors.height}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='weight'>Weight:</Label>
          <Input
            id='weight'
            name='weight'
            type='number'
            value={formData.weight}
            onChange={handleChange}
          />
          {errors.weight && <ErrorMsg>{errors.weight}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='types'>Types:</Label>
          <Select multiple id='types' name='types' value={formData.types} onChange={handleChange}>
            {types.map(type => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </Select>
          {errors.types && <ErrorMsg>{errors.types}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='abilities'>Abilities:</Label>
          <Select
            multiple
            id='abilities'
            name='abilities'
            value={formData.abilities}
            onChange={handleChange}>
            {abilities.map(ability => (
              <option key={ability} value={ability}>
                {ability}
              </option>
            ))}
          </Select>
          {errors.abilities && <ErrorMsg>{errors.abilities}</ErrorMsg>}
        </FormField>

        <SubmitButton type='submit'>Create pokemon</SubmitButton>
        <GoBackButton />
      </Form>

      <Toast show={showToast} message={toastMessage} />
    </FormContainer>
  );
};

export default PokemonForm;
