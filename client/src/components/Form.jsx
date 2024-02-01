import {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {DEV_URL} from '../utils/consts';
import Toast from './Toast';
import {GoBackButton} from './GoBackButton';
import {ErrorMsg, FormContainer, FormField, Label, SubmitButton} from '../styles/Form.styles';
import {Form} from 'react-router-dom';
import {Input} from '../styles/SearchBar.styles';
import {Select} from '../styles/Select.styles';

const PokemonForm = () => {
  const types = useSelector(state => state.types);
  const abilities = useSelector(state => state.abilities);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
      tempErrors.name = 'El nombre es requerido.';
    } else if (/[^a-zA-Z\s]/.test(formData.name)) {
      tempErrors.name = 'El nombre solo debe contener letras.';
    }

    if (!formData.image) {
      tempErrors.image = 'La imagen es requerida.';
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
        tempErrors[field] = `El campo ${field} es requerido.`;
      } else if (isNaN(formData[field]) || formData[field] < 0 || formData[field] > 100) {
        tempErrors[field] = `El campo ${field} debe ser un número entre 0 y 100.`;
      }
    });

    if (!formData.types || formData.types.length === 0) {
      tempErrors.types = 'Debe seleccionar al menos un tipo.';
    }

    if (!formData.abilities || formData.abilities.length === 0) {
      tempErrors.abilities = 'Debe seleccionar al menos una habilidad.';
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
        const response = await axios.post(`${DEV_URL}/pokemons`, formData);
        console.log('Respuesta del servidor:', response.data);
        displayToast('Pokemon creado con éxito!');
      } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
        displayToast('Error al crear el Pokemon.');
      }
    } else {
      console.log('Errores en el formulario:', errors);
      displayToast('Por favor, corrige los errores del formulario.');
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor='name'>Nombre:</Label>
          <Input id='name' name='name' value={formData.name} onChange={handleChange} />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='image'>Imagen:</Label>
          <Input id='image' name='image' value={formData.image} onChange={handleChange} />
          {errors.image && <ErrorMsg>{errors.image}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='hp'>Vida:</Label>
          <Input id='hp' name='hp' type='number' value={formData.hp} onChange={handleChange} />
          {errors.hp && <ErrorMsg>{errors.hp}</ErrorMsg>}
        </FormField>

        <FormField>
          <Label htmlFor='attack'>Ataque:</Label>
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
          <Label htmlFor='special_attack'>Ataque Especial:</Label>
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
          <Label htmlFor='special_defense'>Defensa Especial:</Label>
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
          <Label htmlFor='speed'>Velocidad:</Label>
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
          <Label htmlFor='height'>Altura:</Label>
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
          <Label htmlFor='weight'>Peso:</Label>
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
          <Label htmlFor='types'>Tipos:</Label>
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
          <Label htmlFor='abilities'>Habilidades:</Label>
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

        <SubmitButton type='submit'>Crear Pokemon</SubmitButton>
        <GoBackButton type='button' location='/form' />
      </Form>

      <Toast show={showToast} message={toastMessage} />
    </FormContainer>
  );
};

export default PokemonForm;
