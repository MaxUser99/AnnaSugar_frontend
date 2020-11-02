import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Container from '../../../container/container';
import PlusIcon from '../../../../assets/icons/plus.inline.svg';
import CloseIcon from '../../../../assets/icons/close.inline.svg';
import GalleryIcon from '../../../../assets/icons/gallery.inline.svg';

const MAX_ITEMS = 3;

const Carousel = ({ gallery, setGallery }) => {
  const [ callback, setCallback ] = useState();
  const fileInputRef = useRef();

  const addClickHandler = () => {
    const callback = file => setGallery([...gallery, file]);
    setCallback(() => callback);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const replaceClickHandler = image => () => {
    const callback = file => setGallery(
      gallery.map(x => (
        x === image
        ? file
        : image
      ))
    );
    setCallback(() => callback);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const fileInputChangeHandler = ({ target }) => {
    if (!target.files.length) return;

    const file = URL.createObjectURL(target.files[0]);

    callback(file);

    // hack to clear input[type=file] value
    target.type = '';
    target.type = 'file';
  }

  const removeClickHandler = image => () => {
    setGallery(gallery.filter(x => x !== image));
  }

  console.log('gallery: ', gallery);

  return (
    <Root alignItems='center' fullWidth>
      { 
        gallery.slice(0, MAX_ITEMS).map(x => (
          <GalleryItem
            key={x}
            $image={x}>
              <IconButton onClick={replaceClickHandler(x)} $left>
                <GalleryIcon />
              </IconButton>
              <IconButton onClick={removeClickHandler(x)} $right>
                <CloseIcon />
              </IconButton>
          </GalleryItem>
          ))
      }
      <AddButton
        disabled={gallery.length >= MAX_ITEMS}
        onClick={addClickHandler}>
          <PlusIcon />
      </AddButton>
      <FileInput
        ref={fileInputRef}
        type='file'
        accept="image/*"
        onChange={fileInputChangeHandler} />
    </Root>
  );
};

const Root = styled(Container)`
  margin-top: 20px
`;

const GalleryItem = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  position: relative;
  background: ${({ $image }) => `url(${$image}) center/cover;`}
  button {
    background-color: black;
    stroke: white;
    fill: white;
  }
  button:hover {
    opacity: 0.7;
  }
  :hover button {
    display: block;
  }
`;

const AddButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  padding: 10px;
  :disabled {
    cursor: auto;
    fill: ${({ theme }) => theme.text.mutted};
    border-color: ${({ theme }) => theme.text.mutted};
  }
  :hover:not(:disabled) {
    fill: white;
    background-color: black;
  }
`;

const IconButton = styled(AddButton)`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -15px;
  padding: 6px;
  display: none;
  ${({ $left }) => $left && 'left: -10px;'} 
  ${({ $right }) => $right && 'right: -10px;'} 
`;

const FileInput = styled.input`
  display: none;
`;

export default Carousel;
