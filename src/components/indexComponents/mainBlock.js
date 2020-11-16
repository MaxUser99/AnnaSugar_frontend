import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../container/container';
import Button from '../button/button';
import ContentWrapper from '../contentWrapper/contentWrapper';
import MainImage from '../../assets/images/image.png';
import Fab from '../layout/components/fab';
import ExpandableText from './expandableText';

import { BREAKPOINTS, $minWidth, $maxWidth } from '../../theme';
import { useLocalization } from '../../hooks/useLocalization';
import { onLangChange } from '../../hooks/onLangChange';
import { loadStatic } from '../../store/ui/uiActions';

const MainBlock = () => {
  const [ textHidden, hideText ] = useState(true)
  const { text1, text2 } = useSelector(({ ui: { texts }}) => texts);
  const dispatch = useDispatch();
  const { t } = useLocalization();

  onLangChange(() => dispatch(loadStatic()), 'reloadStatic');
  useEffect(() => {
    dispatch(loadStatic());
  }, []);

  const scrollToReviews = () => {
    const target = document.getElementById('reviews');
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

  const showMoreClickHandler = () => hideText(prev => !prev);

  return (
    <Container fullWidth>
      <StyledWrapper alignItems='flex-start'>
        <TextContainer $show='desctop' direction='column' fullWidth>
          <Title>Anna Sugar</Title>
          <Paragraph>
            {text1}
            {text2}
          </Paragraph>
        </TextContainer>
        <Container direction='column' alignItems='center'>
          <Image src={MainImage} alt='' />
          <ReviewsButton onClick={scrollToReviews} outlined>{t('reviews')}</ReviewsButton>
        </Container >
        <TextContainer $show='mobile' direction='column' fullWidth>
          <Title>Anna Sugar</Title>
          <Container alignItems='stretch' fullWidth>
            <Container direction='column' fullWidth>
              <Paragraph>
                { text1 }
                { text2 && <ReadMore onClick={showMoreClickHandler}> {t('paragraph5.readMore')}</ReadMore> }
              </Paragraph>
              <ExpandableText hidden={textHidden}>
                <Paragraph>
                  { text2 }
                </Paragraph>
              </ExpandableText>
              <Subscribe>{t('subscribe')}</Subscribe>
            </Container>
            <FabWrapper alignItems='center' direction='column'>
              <p>{t('write to me')}</p>
              <Fab />
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
  white-space: nowrap;
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
`;

const StyledWrapper = styled(ContentWrapper)`
  position: relative;
  margin-top: 20px;
  @media screen and (max-width: ${BREAKPOINTS.DESCTOP}px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default MainBlock;
