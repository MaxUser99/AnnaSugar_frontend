import React from 'react';
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

const MainBlock = () => {
  const fabClickHandler = () => window.open(SOCIAL_LINKS.WHATS_UP);

  const scrollToReviews = () => {
    const target = document.getElementById('reviews');
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

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
        <TextContainer $show='mobile' direction='column'>
          <Title>Anna Sugar</Title>
          <Container alignItems='stretch' fullWidth>
            <Container direction='column'>
              <Paragraph>
                Официальный Сайт  Эзотерики Anna Sugar – Мастера Таро, Рун, Бацзы И Других Мантических Инструментов.
              </Paragraph>
              <Subscribe>Записаться</Subscribe>
            </Container>
            <FabWrapper alignItems='center' direction='column'>
              <p>Написать Мне</p>
              <Fab onClick={fabClickHandler}><FabImg src={FabIcon} alt='' /></Fab>
            </FabWrapper>
          </Container>
        </TextContainer>

        <TextContainer $show='desctop' direction='column'>
          <Title>Anna Sugar</Title>
          <Paragraph>
            Здравствуйте! Добро пожаловать на мой официальный сайт. <br />
            Если вы попали на мой сайт, значит в вашей жизни пришло время перемен. 
          </Paragraph>
          <Paragraph>
            Меня зовут <b>Сахарова Анна.</b><br /> 
            Я анализирую и нахожу решения проблем в картах.
          </Paragraph>
          <Paragraph>
            <b>Чем я могу быть вам полезна?</b><br />
            С помощью астрологии я расскажу куда вам двигаться, как улучшить вашу жизнь по всем сферам. После консультации вы поймете, как оттолкнуться от дна и увидите путь вверх!
          </Paragraph>
          <Paragraph>
            Я владею различными методиками коррекции судьбы и помогу вам изменить вашу жизнь с помощью различных знаний. 
            В своей работе помимо астрологии я использую карты Таро, ритуалы на основе Рун, а также технику Access Bars.
          </Paragraph>
          <Paragraph><StyledLink>А еще...</StyledLink></Paragraph>
        </TextContainer>
        <Container direction='column' alignItems='center'>
          <Image src={MainImage} alt='' />
          <ReviewsButton onClick={scrollToReviews} outlined>отзывы</ReviewsButton>
          {/* <Img fixed={data.file.childImageSharp.fixed} /> */}
        </Container >
        <Fab onClick={fabClickHandler} $absolute><FabImg src={FabIcon} alt='' /></Fab>
      </StyledWrapper>
    </Container>
  );
};

const ReviewsButton = styled(Button)`
  margin-top: 20px;
  margin-left: 20px;
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
`;

const Paragraph = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 28px;
`;

const StyledWrapper = styled(ContentWrapper)`
  position: relative;
  margin-top: 20px;
  @media screen and (max-width: ${BREAKPOINTS.DESCTOP}px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

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
    right: 5%;
    top: 517px;
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
