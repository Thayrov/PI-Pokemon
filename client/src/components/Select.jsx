import {
  DoubleSelectContainer,
  Select,
  SelectArrow,
  SelectWrapper1,
  SelectWrapper2,
} from '../styles/Select.styles';

const CustomSelect = ({firsttext, secondtext}) => {
  return (
    <DoubleSelectContainer>
      <SelectWrapper1>
        <Select defaultValue={'placeholder'}>
          <option value='placeholder' disabled>
            {firsttext}
          </option>
          <option>Types</option>
          <option>Abilities</option>
          <option>Source</option>
          <option>Double damage from</option>
          <option>Double damage to</option>
          <option>Half damage from</option>
          <option>Half damage to</option>
          <option>No damage from</option>
          <option>No damage to</option>
        </Select>
        <SelectArrow />
      </SelectWrapper1>
      <SelectWrapper2>
        <Select defaultValue={'placeholder'}>
          <option value='placeholder' disabled>
            {secondtext}
          </option>
          <option>Types</option>
          <option>Abilities</option>
          <option>Source</option>
          <option>Double damage from</option>
          <option>Double damage to</option>
          <option>Half damage from</option>
          <option>Half damage to</option>
          <option>No damage from</option>
          <option>No damage to</option>
        </Select>
        <SelectArrow />
      </SelectWrapper2>
    </DoubleSelectContainer>
  );
};

export default CustomSelect;
