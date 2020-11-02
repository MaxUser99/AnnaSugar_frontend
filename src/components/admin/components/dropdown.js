import React, { useEffect, useRef, useState } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import Select from "react-dropdown-select";
import Container from '../../container/container';

const Dropdown = ({ value }) => {
  const [ minWidth, setMinWidth ] = useState(0);
  const rootRef = useRef();

  useEffect(() => {
    if (!rootRef.current) return;
    const { width } = rootRef.current.getBoundingClientRect();
    setMinWidth(width)
  }, []);

  const changeHandler = selectedValues => {
    const [ targetValue ] = selectedValues;
    const { href } = targetValue;
    navigate(`/admin/${value.href}/${href}`);
  } 

  const rootClickHandler = () => {
    if (!rootRef.current) return;
    const q = rootRef.current.querySelector('.react-dropdown-select');
    q.click();
  }

  return (
    <Root onClick={rootClickHandler} ref={rootRef}>
      <p>{value.title}</p>
      <StyledDropdown
        $minWidth={minWidth}
        options={value.subLinks}
        onChange={changeHandler}
        values={[ value ]}
        dropdownPosition="auto"
        labelField='title'
        valueField='title'
        searchable={false}
      />
    </Root>
  );
}

const Root = styled(Container)`
  position: relative;
`;

const StyledDropdown = styled(Select)`
  &.react-dropdown-select {
    border: none;
    position: static;
    :focus {
      box-shadow: none;
      outline: none;
    }
    :focus-within {
      box-shadow: none;
      outline: none;
    }

  }
  .react-dropdown-select-content {
    display: none;
  }
  .react-dropdown-select-dropdown {
    width: auto;
    border: 1px solid #aaa;
    border-radius: 3px;
    min-width: ${({ $minWidth }) => $minWidth}px;
    background-color: ${({ theme }) => theme.color.darkBeige};
  }
  .react-dropdown-select-item {
    border-bottom: none;
  }
`;

export default Dropdown;