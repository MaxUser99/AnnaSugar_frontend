import React from 'react';
import styled from 'styled-components';
import { Link as BrowserLink } from 'gatsby';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '../container/container';
import zoomIcon from '../../assets/icons/zoom.svg';
import { MODAL_NAMES } from '../../constants/modals';
import { openModal } from '../../store/ui/uiActions';

const Review = ({
  className,
  zoomClickHandler,
  review: { id, short, title, image, text }
}) => (
  <StyledContainer className={className} direction='column' fullWidth>
    <ImageWrapper fullWidth alignItems='center' justifyContent='center'>
      <ZoomBtn onClick={zoomClickHandler}>
        <Image src={zoomIcon} alt='' />
      </ZoomBtn>
      <Image src={image} alt='' />
    </ImageWrapper>
    <Title>{title}</Title>
    <Text>{short || text}</Text>
    <Link to={`/reviews/${id}`}>Read &gt;</Link>
  </StyledContainer>
);

const StyledContainer = styled(Container)`
  max-width: 302px;
  // &:not(:last-child) {
  //   margin-right: 26px;
  // }
`;

const ImageWrapper = styled(Container)`
  // max-height: 192px;
  // height: 100%;
  height: 152px;
  background-color: ${({ theme }) => theme.color.darkBeige};
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Title = styled.h3`
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
  color: ${({ theme }) => theme.text.header};
  margin: 10px 0 8px;
`;

const Text = styled.p`
  font-style: italic;
  font-size: 14px;
  line-height: 24px;
  max-height: 96px;
  overflow: hidden;
  color: ${({ theme }) => theme.text.lighter};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Link = styled(BrowserLink)`
  margin-top: auto;
  padding-top: 29px;
  font-size: 14px;
  line-height: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.color.black};
  transition: 0.3s;
  :hover {
    color: ${({ theme }) => theme.text.mutted};
  }
`;

const ZoomBtn = styled.button`
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

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string
  })
};

export default connect(
  null,
  (dispatch, { review: { image }}) => ({
    zoomClickHandler: () => dispatch(openModal(MODAL_NAMES.ZOOM_IMAGE, image))
  })
)(Review);
