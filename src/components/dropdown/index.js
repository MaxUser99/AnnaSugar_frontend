import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Select from "react-dropdown-select";
import Container from '../container/container';

const Dropdown = ({
  options,
  value,
  label,
  changeHandler,
}) => {
  const [ minWidth, setMinWidth ] = useState(0);
  const rootRef = useRef();

  useEffect(() => {
    if (!rootRef.current) return;
    const { width } = rootRef.current.getBoundingClientRect();
    setMinWidth(width)
  }, []);

  const rootClickHandler = () => {
    if (!rootRef.current) return;
    const q = rootRef.current.querySelector('.react-dropdown-select');
    q.click();
  }

  return (
    <Container direction='column'>
      <Label>{label}</Label>
      <Root onClick={rootClickHandler} ref={rootRef} fullWidth>
        <p>{value.text}</p>
        <StyledDropdown
          $minWidth={minWidth}
          options={options}
          onChange={changeHandler}
          values={[ value ]}
          dropdownPosition="auto"
          labelField='text'
          valueField='text'
          dropdownPosition='bottom'
          searchable={false}
        />
      </Root>
    </Container>
  );
};

const Label = styled.p`
  font-size: 14px;
  line-height: 14px;
  margin: 32px 0 0;
`;

const Root = styled(Container)`
  width: 342px;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid black;
  p {
    margin: 30px 0;
    width: 100%;
    font-size: 20px;
    line-height: 20px;
    opacity: 0.4;
  }
`;

const StyledDropdown = styled(Select)`
  position: static !important;
  border: none !important;
  padding: 27px 5px !important;  

  :focus-within {
    box-shadow: none !important;
    outline: none !important;
  }
  
  :focus {
    box-shadow: none !important;
    outline: none !important;
  }
  /* .react-dropdown-select {
    border: none !important;
    :focus {
      box-shadow: none;
      outline: none;
    }
    :focus-within {
      box-shadow: none;
      outline: none;
    }
  } */
  .react-dropdown-select {

  }
  .react-dropdown-select-content {
    display: none;
  }
  .react-dropdown-select-dropdown {
    width: auto;
    /* border: 1px solid #aaa; */
    border: none;
    border-radius: 3px;
    min-width: ${({ $minWidth }) => $minWidth}px;
    background-color: ${({ theme }) => theme.color.beige};
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background: #999999;
      border-radius: 2px;
      width: 4px;
    }
  }
  .react-dropdown-select-item {
    border-bottom: none;
    font-size: 14px;
    line-height: 14px;
    padding: 20px 10px 20px 32px;
    font-family: "Montserrat Alternates";
    opacity: 0.7;
    :focus {
      background: transparent;
    }
    :hover {
      opacity: 1;
      background: transparent;
    }
  }
  .react-dropdown-select-item.react-dropdown-select-item-selected {
    background: transparent;
    border-bottom: none;
    color: black;
    opacity: 1;
  }
`;

export default Dropdown;
