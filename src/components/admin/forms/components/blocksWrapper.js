import React from 'react';
import styled from 'styled-components';
import Container from '../../../container/container';
import TextBlock from './textBlock';
import AddIcon from '../../../../assets/icons/plus.inline.svg';

const BlocksWrapper = ({
  title,
  blocks = [],
  removeHandler,
  addHandler
}) => (
  <StyledRoot direction='column' fullWidth>
    <BlockHeader>{title}</BlockHeader>
    {
      blocks.map(block => (
        <TextBlock
          key={block.header}
          data={block}
          removeButton={null}
        />
      ))
    }
    <AddButton onClick={addHandler}>
      <AddIcon />
    </AddButton>
  </StyledRoot>
)

const StyledRoot = styled(Container)``;

const AddButton = styled.button`
  margin-left: auto;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
  :hover:not(:disabled) {
    fill: white;
    background-color: black;
  }
`;

const BlockHeader = styled.h3`

`;

export default BlocksWrapper;
