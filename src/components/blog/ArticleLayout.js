import React from 'react';
import styled from 'styled-components';
import Container from '../container/container';

const ArticleLayout = ({ article: { title, image, text, date } }) => {
  return (
    <>
      <Title>{title}</Title>
      <Date>
        {`
            ${date.getDate()}
            ${date.toLocaleDateString('en-US', { month: 'long'})}
            ${date.getFullYear()}
        `} 
      </Date>
      <ImageContainer justifyContent='center' fullWidth>
        <img src={image} alt='' />
      </ImageContainer>
      <Text>{text}</Text>
    </>
  )
};

const Title = styled.h2`
  width: 100%;
  font-family: "Cormorant Infant";
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  color: ${({ theme }) => theme.text.header};
  margin: 16px 0 20px;
`;

const Date = styled.p`
  width: 100%;
  margin: 0;
`;

const ImageContainer = styled(Container)`
  max-height: 512px;
  margin: 32px 0;
  overflow: hidden;
`;

const Text = styled.p`
  white-space: pre-line;
  font-size: 16px;
  line-height: 36px;
  font-family: 'Montserrat Alternates';
  width: 100%;
`;

export default ArticleLayout;
