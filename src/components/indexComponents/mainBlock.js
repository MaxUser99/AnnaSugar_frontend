import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '../container/container';
import Button from '../button/button';
import ContentWrapper from '../contentWrapper/contentWrapper';
import MainImage from '../../assets/images/image.png';
import FabIcon from '../../assets/images/whatsup-fab.svg';
// import Img from 'gatsby-image';
// import { useStaticQuery, graphql } from 'gatsby';
import { BREAKPOINTS, $minWidth, $maxWidth } from '../../theme';
import SOCIAL_LINKS from '../../constants/socialLinks';
import ExpandableText from './expandableText';
import { useLocalization } from '../../hooks/useLocalization';

const MainBlock = () => {
  const { t } = useLocalization();
  const [ textHidden, hideText ] = useState(true)
  const fabClickHandler = () => window.open(SOCIAL_LINKS.WHATS_UP);

  const scrollToReviews = () => {
    const target = document.getElementById('reviews');
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

  const showMoreClickHandler = () => hideText(prev => !prev);

  // const data = useStaticQuery(graphql`
  //   query MyQuery {
  //     file(relativePath: {eq: "image.png"}) {
  //       childImageSharp {
  //         fixed(width: 366) {
  //           aspectRatio
  //           src
  //           srcSet
  //           width
  //           height
  //         }
  //       } 
  //     }
  //   }  
  // `);
  return (
    <Container fullWidth>
      <StyledWrapper alignItems='flex-start'>
        <TextContainer $show='desctop' direction='column'>
          <Title>Anna Sugar</Title>
          <Paragraph>{ t('paragraph1')}</Paragraph>
          <Paragraph>
            {t('paragraph2.1')}
            <b> {t('paragraph2.2')} </b>
            {t('paragraph2.3')}
          </Paragraph>
          <Paragraph>
            <b> {t('paragraph3.1')} </b><br />
            {t('paragraph3.2')}
          </Paragraph>
          <Paragraph>{t('paragraph4')}</Paragraph>
        </TextContainer>
        <Container direction='column' alignItems='center' fullWidth>
          <Image src={MainImage} alt='' />
          <ReviewsButton onClick={scrollToReviews} outlined>{t('reviews')}</ReviewsButton>
          {/* <Img fixed={data.file.childImageSharp.fixed} /> */}
        </Container >
        <Fab onClick={fabClickHandler} $absolute><FabImg src={FabIcon} alt='' /></Fab>

        <TextContainer $show='mobile' direction='column'>
          <Title>Anna Sugar</Title>
          <Container alignItems='stretch' fullWidth>
            <Container direction='column'>
              <Paragraph>
                {t('paragraph5')}
                <ReadMore onClick={showMoreClickHandler}>{t('paragraph5.readMore')}</ReadMore>
              </Paragraph>
              <ExpandableText hidden={textHidden}>
                <Paragraph>
                  {t('paragraph2.1')}<b> {t('paragraph2.2')}</b><br />
                  {t('paragraph6')}
                </Paragraph>
                <Paragraph>
                  <b>{t('paragraph3.1')}</b><br />
                  {t('paragraph3.2')}
                </Paragraph>
                <Paragraph>
                  {t('paragraph4')}
                </Paragraph>
              </ExpandableText>
              <Subscribe>{t('subscribe')}</Subscribe>
            </Container>
            <FabWrapper alignItems='center' direction='column'>
              <p>{t('write to me')}</p>
              <Fab onClick={fabClickHandler}><FabImg src={FabIcon} alt='' /></Fab>
            </FabWrapper>
          </Container>
        </TextContainer>
      </StyledWrapper>
    </Container>
  );
};

const ReadMore = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const ReviewsButton = styled(Button)`
  margin-top: 14px;
  margin-left: 20px;
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    width: 100%;
    margin-left: 0;
    margin-bottom: 24px;
  `)}
`;

const Image = styled.img`
  width: 366px;
  height: 616px;
`;

const Subscribe = styled(Button)`
  margin-top: auto;
  margin-bottom: 20px;
  ${ $maxWidth(BREAKPOINTS.TABLET, 'width: 100%;') }
`;

const FabWrapper = styled(Container)`
  margin-top: auto;
  ${ $maxWidth(BREAKPOINTS.TABLET, 'display: none;') }
  p {
    transform: rotate(-90deg);
    white-space: nowrap;
    margin-top: 54px;
    margin-bottom: 88px;
  }
`;

const TextContainer = styled(Container)`
  ${
    ({ $show }) => {
      if ($show === 'desctop') {
        return `
          max-width: 50.5%;
          padding-right: 80px;
          ${ $maxWidth(BREAKPOINTS.DESCTOP, 'display: none;') }
        `;
      }
      if ($show === 'mobile') {
        return $minWidth(BREAKPOINTS.DESCTOP, 'display: none;');
      }
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  font-family: "Cormorant Infant";
  font-style: normal;
  font-weight: bold;
  font-size: 68px;
  line-height: 68px;
  margin: 0 0 10px;
  ${ $maxWidth(BREAKPOINTS.TABLET, 'margin: 0 auto 10px auto;') }
  ${ $maxWidth(BREAKPOINTS.TABLET, 'font-size: 48px;')}
`;

const Paragraph = styled.p`
  white-space: pre-line;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 28px;
  transition: 0.3s;
  margin: 0;
  padding: 1rem 0;
  /* ${ ({ $hidden }) => $hidden && `
    height: 0;
    visibility: hidden;
    margin: 0;
  `} */
`;

const StyledWrapper = styled(ContentWrapper)`
  position: relative;
  margin-top: 20px;
  @media screen and (max-width: ${BREAKPOINTS.DESCTOP}px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

// position: fixed;
// bottom: 11%;
// right: 7.5%;
// z-index: 1;

const Fab = styled.button`
  border: none;
  border-radius: 50%;
  padding: 0;
  outline: none;
  background: transparent;
  margin-top: auto;
  width: 98px;
  height: 98px;
  cursor: pointer;
  ${({ $absolute }) => $absolute && `
    ${ $maxWidth(BREAKPOINTS.DESCTOP, 'display: none;') }
    position: absolute;
    // right: 3.25%;
    right: 8%;
    top: 0;
  `}
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
`;

const StyledLink = styled.a`
  text-decoration: underline;
`;

const FabImg = styled.img``;

export default MainBlock;
