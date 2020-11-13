import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Container from '../container/container';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { $maxWidth, BREAKPOINTS } from '../../theme';

const Gallery = ({ images }) => {
  const [hidden, setHidden] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonsOffset, setButtonsOffset] = useState(images.map(() => 0));

  useEffect(() => {
    setButtonsOffset(images.map(() => 0));
  }, [images])

  const loadHandler = i => ({ target: { offsetWidth, parentNode } }) => {
    setButtonsOffset(prev => prev.map((offset, j) => {
      if (i !== j) return offset;
      const parentWidth = parentNode.offsetWidth;
      const newOffset = (parentWidth - offsetWidth) / 2;
      return newOffset;
    }));
  }

  const nextClickHandler = () => {
    setCurrentIndex(currentIndex + 1);
    setHidden(true);
    setTimeout(() => setHidden(false), 300);
  }
  const prevClickHandler = () => {
    setCurrentIndex(currentIndex - 1);
    setHidden(true);
    setTimeout(() => setHidden(false), 300);
  }

  return (
    <Root className='gallery-root'>
      <Button
        className='gallery-prev'
        onClick={prevClickHandler}
        $hidden={!images.length || hidden}
        disabled={!images[currentIndex - 1]}
        $offset={buttonsOffset[currentIndex]}>
        <img src={arrowLeft} alt='' />
      </Button>
      {
        images.map((image, i) => (
          <ImageContainer key={image} className='gallery-container' $position={Math.sign(i - currentIndex)}>
            <Image className='gallery-image' onLoad={loadHandler(i)} src={image} alt='' />
          </ImageContainer>
        ))
      }
      <Button
        className='gallery-next'
        onClick={nextClickHandler}
        $hidden={!images.length  || hidden}
        disabled={!images[currentIndex + 1]}
        $offset={buttonsOffset[currentIndex]}>
        <img src={arrowRight} alt='' />
      </Button>
    </Root>
  );
}

const Root = styled(Container)`
  overflow: hidden;
  position: relative;
  max-width: 300px;
  min-height: 300px;
  width: 100%;
  align-items: flex-start;
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
  align-items: flex-start;
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

const hideAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
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
  height: 50px;
  top: 50%;
  transform: translateY(-50%);
  ${ ({ $hidden }) => $hidden && css`
    visibility: hidden;
    animation: ${hideAnimation} 0.3s;
  `};
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    background: transparent;
    border: 1px solid white;
  `)}
  img {
    transition: 0.3s;
  }
  :first-of-type {
    left: ${ ({ $offset }) => `${$offset}px;`};
    border-radius: 0 4px 4px 0;
  }
  :last-of-type {
    right: ${ ({ $offset }) => `${$offset}px;`};
    border-radius: 4px 0 0 4px;
  }
  :hover {
    img {
      ${ ({ disabled }) => !disabled && `
        transform: scale(2);
      `}
    }
  }
`;

export default Gallery;
