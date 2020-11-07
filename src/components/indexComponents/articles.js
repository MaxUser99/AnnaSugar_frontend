import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useNavigate } from "@reach/router";
import Container from '../container/container';
import ContentWrapper from '../contentWrapper/contentWrapper';
import Preview from '../preview/preview';
import Button from '../button/button';
import { setReviewArticle } from '../../store/content/articleActions';
import { $maxWidth, BREAKPOINTS } from '../../theme';
import { useLocalization } from '../../hooks/useLocalization';
import loadArticles from '../indexComponents/loadArticles';

const PREVIEW_ITEMS_COUNT = 4;

const Articles = ({ articles, setReviewArticle }) => {
  const { t } = useLocalization();
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    navigate('/blog');
  }

  return (
    <Container fullWidth>
      <ContentWrapper direction='column' alignItems='center'>
        <Title>{t("Статьи")}</Title>
        { 
          articles.slice(0, PREVIEW_ITEMS_COUNT).map(article => (
            <Preview
              key={article.id}
              image={article.image}
              name={article.title}
              description={article.short}
              date={article.date}
              linkProps={{
                show: true,
                text: 'Read \u003E',
                to: `/blog/${article.id}`,
                onClick: () => setReviewArticle(article)
              }}
            />
          ))
        }
        <StyledButton onClick={buttonClickHandler}>{t('all')}</StyledButton>
      </ContentWrapper>
    </Container>
  );
};

const Title = styled.h2`
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
  color: ${({ theme }) => theme.text.header};
  margin: 64px 0 32px;
  font-family: 'Cormorant Infant';
`;

const StyledButton = styled(Button)`
  margin-top: 64px;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, 'margin-bottom: 64px;')}
`;

const mapStateToProps = ({content: { articles: { data }}}) => ({ 
  articles: data,
});

const mapDispatchToProps = (dispatch) => ({
  setReviewArticle: article => dispatch(setReviewArticle(article))
});

export default loadArticles(connect(mapStateToProps, mapDispatchToProps)(Articles));
