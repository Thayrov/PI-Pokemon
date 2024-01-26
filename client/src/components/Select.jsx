import {Select, SelectArrow, SelectWrapper} from '../styles/Select.styles';

const CustomSelect = () => {
  return (
    <>
      <SelectWrapper>
        <Select>
          <option value='placeholder' disabled>
            Filter By:
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
      </SelectWrapper>
      <SelectWrapper>
        <Select>
          <option value='placeholder' disabled>
            Filter By:
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
      </SelectWrapper>
    </>
  );
};

export default CustomSelect;
