import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(${({theme: {colors}}) => colors.Jet}, 1);
  border-radius: 10px;
  box-shadow: 2px 2px 6px 1px rgba(${({theme: {colors}}) => colors.BlackOlive}, 1);
  margin: 20px;
  overflow: auto;
  max-height: 100vh;
`;

export const FormTitle = styled.h1`
  color: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  background: rgba(${({theme: {colors}}) => colors.Platinum}, 1);
  color: rgba(${({theme: {colors}}) => colors.Jet}, 1);

  &:focus {
    outline: none;
    border-color: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  }
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  background: rgba(${({theme: {colors}}) => colors.Platinum}, 1);
  color: rgba(${({theme: {colors}}) => colors.Jet}, 1);

  &:focus {
    outline: none;
    border-color: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  color: rgba(${({theme: {colors}}) => colors.SeaSalt}, 1);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(${({theme: {colors}}) => colors.Bittersweet}, 0.8);
  }

  &:active {
    background: rgba(${({theme: {colors}}) => colors.Bittersweet}, 0.6);
  }
`;

export const ErrorMsg = styled.span`
  color: rgba(${({theme: {colors}}) => colors.Bittersweet}, 1);
  font-size: 0.8em;
`;
