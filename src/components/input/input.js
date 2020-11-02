import React, { useEffect, useLayoutEffect, useMemo, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Container from '../container/container';

const Input = ({
  name,
  label,
  className,
  inputRef,
  error,
  multiline,
  ...props
}) => {
  const InputComponent = multiline
    ? Textarea
    : StyledInput;

  const refProps = multiline
    ? { inputRef }
    : { ref: inputRef };

  return (
    <StyledContainer
      className={className}
      direction='column'
      alignItems='flex-start'
      fullWidth>
      <Label error={error} htmlFor={`${name}-input`}>{label}</Label>
      <InputComponent
        id={`${name}-input`}
        name={name}
        { ...refProps }
        error={error}
        {...props}
      />
    </StyledContainer>
  );
}

const Textarea = props => {
  const {
    onChange = () => {},
    defaultValue,
    inputRef,
    ...rest
  } = props;
  const [ contentHeight, setHeight ] = useState(0);
  const [ inputNode, setInputNode ] = useState();

  function calcHeight() {
    if (inputNode) {
      const h = inputNode.scrollHeight;
      setHeight(h);
    }
  }

  useEffect(() => {
    if (inputNode && inputRef) {
      inputRef(inputNode);
    }
    calcHeight();
  }, [inputNode]);

  useEffect(() => {
    calcHeight();
  }, [defaultValue]);

  const changeHandler = e => {
    calcHeight();
    onChange(e);
  };

  return (
    <StyledTextArea
      ref={node => node && setInputNode(node)}
      onChange={changeHandler}
      $height={contentHeight}
      defaultValue={defaultValue}
      {...rest} />
  );
};

const StyledContainer = styled(Container)`
  &:not(:last-of-type) {
    margin-bottom: 40px;
  }
`;

const inputStyles = css`
  width: 100%;
  border-width: 0 0 1px;
  border-color: ${({ error }) => (error ? '#e85d5d' : '#969696')};
  transition: 0.3s;
  font-size: 20px;
  line-height: 20px;
  padding: 0;
  box-sizing: border-box;
  color: ${({ theme }) => ( theme.text.lighter2 )};
  background-color: transparent;
  ::placeholder {
    opacity: 0.4;
  }
  :focus {
    outline: none;
    border-color: ${({ error }) => (error ? '#e85d5d' : 'black')};
  }
  [type="password"] {
    font-family: caption;
    letter-spacing: 1px;
  }
  :disabled {
    border-color: #aaa;
    color: #aaa;
  }
`;

const StyledTextArea = styled.textarea`
  ${inputStyles}
  padding: 28px 0;
  resize: vertical;
  min-height: 80px;
  height: ${({ $height }) => ($height + 1)}px;
  transition: height 0s; 
`;

const StyledInput = styled.input`
  ${inputStyles}
  // height: 80px;
  padding: 28px 0;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme, error }) => (error ? '#e85d5d' : theme.text.lighter2 )};
`;

export default Input;
