import React from 'react';
import styled from 'styled-components';
import Container from '../container/container';
import FaqList from './faqList';
import OptionsSelect from './optionsSelect';
import OptionsList from './optionsList';
import Button from '../../components/button/button';
import infoIcon from '../../assets/icons/info.svg';
import Price from '../../components/price/price';
import { BREAKPOINTS, $maxWidth } from '../../theme';

const ConsultItem = ({ item }) => {
  const {
    title,
    quoted,
    image,
    short,
    description,
    imageInfo,
    price,
    priceRemark,
    optionsList,
    optionsSelect,
    faqList,
    info,
  } = item;

  return (
    <Container direction='column' fullWidth>
      <MainBlock alignItems='flex-start' justifyContent='space-between' fullWidth>
        <ImageContainer
          direction='column'
          justifyContent='center'
          alignItems='center'
          fullWidth>
            <img src={`/${image}`} alt='' />
            { imageInfo && <Info>{imageInfo}</Info>}
        </ImageContainer>
        <ContentBlock direction='column'>
          <Title>{ quoted ? `«${title}»` : title }</Title>
          <Short>{short}</Short>
          { optionsSelect && <OptionsSelect data={optionsSelect} />}
          { optionsList && <OptionsList data={optionsList} />}
          { faqList && <FaqList data={faqList} />}
          { info && <Info>{info}</Info>}
          {
            price && <>
              <Label>Цена</Label>
              <StyledPrice remark={`(${priceRemark})`}>{price}</StyledPrice>
            </>
          }
          <Button>заказать</Button>
        </ContentBlock>
      </MainBlock>
      { description && <Descritption>{ description }</Descritption> }
    </Container>
  );
};

const MainBlock = styled(Container)`
  margin-top: 48px;
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    flex-direction: column;
    align-items: center;
  `)}
`;
const Descritption = styled(Container)``;
const ImageContainer = styled(Container)`
  max-width: 350px;
  min-width: 220px;
  img {
    height: 100%;
    width: 100%;
  }
`;
const ContentBlock = styled(Container)`
  /* max-width: 508px; */
  /* margin-left: 25px; */
  margin-left: 110px;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, 'margin-left: 38px;')}
  ${ $maxWidth(BREAKPOINTS.TABLET, 'margin-left: 0;')}
  ${ $maxWidth(BREAKPOINTS.TABLET, 'button { width: 100%; }')}
`;

const Info = styled.p`
  position: relative;
  padding-left: 25px;
  font-size: 14px;
  line-height: 28px;
  color: ${({ theme }) => theme.color.black};
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 3px;
    display: block;
    width: 21px;
    height: 21px;
    background: url(${infoIcon});
  }
`;

const Title = styled.h2`
  margin: 16px 0 10px;
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
  color: ${({ theme }) => theme.text.header};
`;

const StyledPrice = styled(Price)`
  margin: 0;
  & + button {
    margin-top: 32px
  }
`;

const Short = styled.p`
  font-size: 14px;
  line-height: 28px;
  color: ${({ theme }) => theme.text.default};
`;
const Label = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme }) => theme.text.mutted};
  margin: 32px 0 0;
`;

export default ConsultItem;
