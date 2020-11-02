import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { openModal } from '../../store/ui/uiActions';
import { MODAL_NAMES } from '../../constants/modals';
import CloseImage from '../../assets/icons/close.inline.svg';
import ZoomIn from '../../assets/icons/zoom.svg';
import ZoomOut from '../../assets/icons/zoom-out.svg';
import Container from '../container/container';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '90%',
    padding: '30px 44px',
    boxSizing: 'border-box',
    maxHeight: '85%',
    maxWidth: '1000px',
    backgroundColor: '#DAD8D1',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(84, 84, 84, 0.6)'
  }
};

const ImageModal = ({ isOpen, closeHandler, image }) => {
  const imageRef = useRef();
  const [ containerHeight, setHeight ] = useState('auto');
  const [ currentScale, setScale ] = useState(1);

  const scaleUp = () => setScale(curr => curr + 0.1);
  const scaleDown = () => setScale(curr => curr - 0.1);
  const calcContainerHeight = () => {
    if (!imageRef.current) return;
    setHeight(imageRef.current.getBoundingClientRect().height);
  };

  useEffect(() => {
    calcContainerHeight();
  }, [ currentScale ])

  useEffect(() => {
    if (!isOpen) setScale(1);
    return () => setScale(1);
  }, [ isOpen ]);

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      contentLabel="Example Modal"
      onRequestClose={closeHandler}
      style={customStyles}>
        <StyledContainer
          $height={containerHeight}
          justifyContent='center'
          alignItems='center'
          fullWidth>
          <PreviewImage
            ref={imageRef}
            src={image}
            onLoad={calcContainerHeight}
            $scale={currentScale}
            alt=''
          />
          <Buttons alignItems='center'>
            <Button onClick={scaleDown}>
              <img src={ZoomOut} alt='' />
            </Button>
            <Button onClick={scaleUp}>
              <img src={ZoomIn} alt='' />
            </Button>
            <Button onClick={closeHandler}>
              <img src={CloseImage} alt='' />
            </Button>
          </Buttons>
        </StyledContainer>
    </Modal>
  );
};

const StyledContainer = styled(Container)`
  transition: 0.3s;
  height: ${({ $height}) => ($height === 'auto' ? $height : `${$height}px` )};
`;

const PreviewImage = styled.img`
  transform: scale(${({ $scale }) => $scale});
`;

const Buttons = styled(Container)`
  position: absolute;
  top: 30px;
  right: 44px;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  background-color: #222222;
  border: none;
  border-radius: 50%;
  opacity: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
  &:hover {
    opacity: 0.7;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export default connect(
  ({ ui: { openedModal, state }}) => ({
    isOpen: openedModal === MODAL_NAMES.ZOOM_IMAGE,
    image: state
  }),
  dispatch => ({
    closeHandler: () => dispatch(openModal(null))
  })
)(ImageModal);