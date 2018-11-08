import styled from "styled-components";

export const Label = styled.label`
  font-family: Open Sans;
  font-style: normal;
  line-height: 15px;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #2e2e2e;
  padding: 0;
  letter-spacing: 0.03em;
  margin-bottom: 10px;
  display: block;
  font-weight: 700;
  text-transform: uppercase;

  & * {
    margin-top: 6px;
  }
`;

export const TextInput = styled.input`
  margin: 0 0 40px 0;
  display: block;
  background: transparent;
  -moz-user-focus: none;
  outline: none;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  letter-spacing: 0.02em;
  color: #2e2e2e;
  padding: 6px 0px;
  border-style: none none solid none;
  border-bottom: 2px solid #969696;
  width: 100%;
  transition: all 0.2s;

  :focus {
    border-bottom: 2px solid #7e1587;
  }
`;

export const SelectInput = styled.select`
  margin: 0 0 40px 0;
  display: block;
  background: transparent;
  -moz-user-focus: none;
  outline: none;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #2e2e2e;
  padding: 6px 0px;
  border-style: none none solid none;
  border-bottom: 2px solid #969696;
  width: 100%;
  transition: all 0.2s;
  position: relative;

  :focus {
    border-bottom: 2px solid #7e1587;
  }
`;
