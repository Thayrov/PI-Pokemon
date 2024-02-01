import {
  DoubleSelectContainer,
  Select,
  SelectArrow,
  SelectWrapper1,
  SelectWrapper2,
} from '../styles/Select.styles';

const CustomSelect = ({
  firsttext,
  secondtext,
  firstcontent,
  secondcontent,
  onFirstSelectChange,
  onSecondSelectChange,
  keyValue,
}) => {
  const handleFirstSelect = e => {
    if (onFirstSelectChange) {
      onFirstSelectChange(e.target.value);
    }
  };
  const handleSecondSelect = e => {
    if (onSecondSelectChange) {
      onSecondSelectChange(e.target.value);
    }
  };
  return (
    <DoubleSelectContainer>
      <SelectWrapper1>
        <Select defaultValue={'placeholder'} onChange={handleFirstSelect}>
          <option value='placeholder' disabled>
            {firsttext}
          </option>
          {firstcontent &&
            firstcontent.length > 0 &&
            firstcontent.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </Select>
        <SelectArrow />
      </SelectWrapper1>
      <SelectWrapper2 key={keyValue}>
        <Select
          defaultValue={'placeholder'}
          onChange={handleSecondSelect}
          disabled={!secondcontent.length}>
          <option value='placeholder' disabled>
            {secondtext}
          </option>
          {secondcontent &&
            secondcontent.length > 0 &&
            secondcontent.map(option => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
        </Select>
        <SelectArrow />
      </SelectWrapper2>
    </DoubleSelectContainer>
  );
};

export default CustomSelect;
