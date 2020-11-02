import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MODAL_NAMES } from '../../constants/modals';
import { openModal } from '../../store/ui/uiActions';
import Container from '../container/container';
import zoomIcon from '../../assets/icons/zoom.svg';

const ReviewLayout = ({
  zoomClickHandler,
  review: { title, image, text }}
) => (
  <>
    <Title>{title}</Title>
    <ImageContainer justifyContent='center' alignItems='center' fullWidth>
      <img src={image} alt='' />
      <ZoomButton onClick={zoomClickHandler}>
        <img src={zoomIcon} alt='' />
      </ZoomButton>
    </ImageContainer>
    <Text>{text}</Text>
  </>
);

const Title = styled.h2`
  width: 100%;
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  color: ${({ theme }) => theme.text.header};
  margin: 16px 0 20px;
`;

const ImageContainer = styled(Container)`
  max-height: 512px;
  margin: 32px 0;
  overflow: hidden;
  position: relative;
`;

const Text = styled.p`
  width: 100%;
`;

const ZoomButton = styled.button`
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  border-radius: 50%;
  background: transparent;
  position: absolute;
  cursor: pointer;
  width: 40px;
  height: 40px;
  transition: 0.3s;
  &:hover {
    background: #aaaaaa70;
    transform: scale(1.2);
  }
`;

export default connect(
  null,
  (dispatch, { review: { image }}) => ({
    zoomClickHandler: () => dispatch(openModal(MODAL_NAMES.ZOOM_IMAGE, image))
  })
)(ReviewLayout);
