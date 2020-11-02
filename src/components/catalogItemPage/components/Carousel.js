import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../container/container';
import arrowLeft from '../../../assets/icons/arrow-left.svg';
import arrowRight from '../../../assets/icons/arrow-right.svg';
import { BREAKPOINTS, $maxWidth } from '../../../theme';
import Breadscrumb from '../../breadscrumb/breadscrumb';

const MAX_ITEMS = 3;

const Carousel = ({ images }) => {
  const [ previewItem, setPreviewItem ] = useState(images[0]);
  const [ offset, setOffset ] = useState(0);

  useEffect(() => {
    if (!previewItem) setPreviewItem(images[0]);
  }, [ images ]);

  const prevButtonClickHandler = () => setOffset(prev => (prev === 0 ? 0 : prev - 1));
  const nextButtonClickHandler = () => setOffset(prev => (prev + MAX_ITEMS === images.length ? prev : prev + 1));

  const disableButtons = images.length <= MAX_ITEMS;

  return (
    <Container direction='column' alignItems='center'>
      <ImageWrapper justifyContent='center' alignItems='center'>
        {previewItem && <img src={`/${previewItem}`} />}
      </ImageWrapper>
      <PreviewImagesContainer justifyContent='space-between' alignItems='center' fullWidth>
        <Button onClick={prevButtonClickHandler} disabled={disableButtons}>
          <img src={arrowLeft} alt='' />
        </Button>
        {
          images.slice(offset, MAX_ITEMS + offset).map(image => (
            <SmallImage
              key={image}
              onClick={() => setPreviewItem(image)}
              src={`/${image}`}
              alt=''
            />
          ))
        }
        <Button onClick={nextButtonClickHandler} disabled={disableButtons}>
          <img src={arrowRight} alt='' />
        </Button>
      </PreviewImagesContainer>
    </Container>
  );
}

const ImageWrapper = styled(Container)`
  max-width: 390px;
  max-height: 390px;
  min-width: 300px;
  min-height: 300px;
  ${
    $maxWidth(BREAKPOINTS.DESCTOP, `
      max-width: 240px;
      max-height: 240px;
      min-width: 200px;
      min-height: 200px;
    `)
  }
  background-color: ${({ theme }) => theme.color.darkBeige};
  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Button = styled.button`
  width: 76px;
  height: 76px;
  border: 1px solid transparent;
  transition: 0.3s;
  background-color: transparent;
  cursor: pointer;
  border-radius: 2px;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, `
    width: 50px;
    height: 50px;
  `) }
  &:hover {
    border-color: black;
  }
`;

const SmallImage = styled.img`
  max-width: 50px;
  max-height: 50px;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, `
    max-width: 30px;
    max-height: 30px;
  `) }
`;

const PreviewImagesContainer = styled(Container)`
  margin-top: 54px;
  & > img {
    cursor: pointer;
    border: 1px solid transparent;
    transition: 0.3s;
    border-radius: 2px;
    &:hover {
      border-color: black;
    }
  }
`;

export default Carousel;
