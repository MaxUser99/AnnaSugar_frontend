import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../container/container';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';

const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonsOffset, setButtonsOffset] = useState(images.map(() => 0));
  const [imagesHeight, setImagesHeight] = useState(images.map(() => 0));

  const loadHandler = i => ({ target: { offsetWidth, offsetHeight, parentNode } }) => {
    setButtonsOffset(prev => prev.map((offset, j) => {
      if (i !== j) return offset;
      const parentWidth = parentNode.offsetWidth;
      const newOffset = (parentWidth - offsetWidth) / 2;
      return newOffset;
    }));
    setImagesHeight(prev => prev.map((height, j) => j === i ? offsetHeight : height));
  }

  const nextClickHandler = () => setCurrentIndex(prev => (
    prev + 1 < images.length
    ? prev + 1
    : prev
  ));

  const prevClickHandler = () => setCurrentIndex(prev => (
    prev - 1 >= 0
    ? prev - 1
    : prev
  ));

  return (
    <Root>
      <Button
        onClick={prevClickHandler}
        $offset={buttonsOffset[currentIndex]}
        $height={imagesHeight[currentIndex]}>
        <img src={arrowLeft} alt='' />
      </Button>
      {
        images.map((image, i) => (
          <ImageContainer key={image} $position={Math.sign(i - currentIndex)}>
            <Image onLoad={loadHandler(i)} src={image} alt='' />
          </ImageContainer>
        ))
      }
      <Button
        onClick={nextClickHandler}
        $offset={buttonsOffset[currentIndex]}
        $height={imagesHeight[currentIndex]}>
        <img src={arrowRight} alt='' />
      </Button>
    </Root>
  );
}

const Root = styled(Container)`
  overflow: hidden;
  position: relative;
  max-width: 300px;
  width: 100%;
  align-items: center;
  button {
    opacity: 0;
  }
  :hover {
    button {
      opacity: 1;
    }
  }
`;

const ImageContainer = styled(Container)`
  min-width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  transition: height 0.3s, width 0.3s, left 0.3s, right 0.3s;
  background: ${ ({ theme }) => theme.color.beige};
  transition-timing-function: ease-in;

  ${ ({ $position }) => {
    switch ($position) {
      case -1: return `left: -100%;`;
      case 0: return `left: 0;`;
      case 1: return `left: 100%;`;
    }
  }};

  max-width: 300px;
`;

const Image = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  transition: height 0.3s, width 0.3s;
  border-radius: 4px;
`;

const Button = styled.button`
  position: absolute;
  cursor: pointer;
  background: #dad8d1bd;
  z-index: 1;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  transition: left 0.3s, right 0.3s, opacity 0.3s;
  height: ${ ({ $height }) => (
    $height
    ? `${$height}px;`
    : '100%;'
  )};
  img {
    transition: 0.3s;
  }
  :first-of-type {
    left: ${ ({ $offset }) => `${$offset}px;`};
    border-radius: 4px 0 0 4px;
  }
  :last-of-type {
    right: ${ ({ $offset }) => `${$offset}px;`};
    border-radius: 0 4px 4px 0;
  }
  :hover {
    img {
      transform: scale(2)
    }
  }
`;

export default Gallery;
