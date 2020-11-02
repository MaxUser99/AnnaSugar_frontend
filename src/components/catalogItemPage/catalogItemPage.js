import React, { useState, useEffect } from 'react';
import { useLoading } from '../../hooks/useLoading';
import styled from 'styled-components';
import Layout from '../layout/layout';
import Container from '../container/container';
import ContentWrapper from '../contentWrapper/contentWrapper';
import Breadscrumb from './components/breadscrumb';
import ItemPage from './components/itemPage';
import Features from './components/features';
import Description from './components/descriptions';
import Button from '../button/button';

const SUB_PAGES = {
  DESCRIPTION: 'DESCRIPTION',
  FEATURES: 'FEATURES',
};

const CatalogItemPage = ({ itemId, reviewItem, clearHandler, loadItem }) => {
  const { isLoading, shouldRedirect } = useLoading(!reviewItem, () => loadItem(itemId));
  const [ subPage, setSubPage ] = useState(SUB_PAGES.DESCRIPTION);

  useEffect(() => clearHandler, []);

  return (
    <StyledLayout>
      <StyledContainer fullWidth>
        <ContentWrapper direction='column'>
          <Breadscrumb itemName={reviewItem ? reviewItem.name : '...'} />
          {
            shouldRedirect
            ? <div>should redirect</div>
            : <ItemPage item={reviewItem} isLoading={isLoading} />
          }
          <TabMenu fullWidth>
            <Tab
              onClick={() => setSubPage(SUB_PAGES.DESCRIPTION)}
              $active={subPage === SUB_PAGES.DESCRIPTION}>
                Описание
              </Tab>
            <Tab
              onClick={() => setSubPage(SUB_PAGES.FEATURES)}
              $active={subPage === SUB_PAGES.FEATURES}>
                Характеристики
              </Tab>
          </TabMenu>
        </ContentWrapper>
      </StyledContainer>
      <Container fullWidth>
        <SubPageWrapper>
          { subPage === SUB_PAGES.DESCRIPTION && <Description /> }
          { subPage === SUB_PAGES.FEATURES && <Features /> }
        </SubPageWrapper>
      </Container>
    </StyledLayout>
  );
}

const SubPageWrapper = styled(ContentWrapper)`
  padding-top: 40px;
  padding-bottom: 60px;
  // padding: 40px 0 60px;
`;

const TabMenu = styled(Container)`
  margin-top: 64px;
`;

const Tab = styled(Button)`
  border-radius: 0;
  // background-color: transparent;
  background-color: ${({ $active, theme }) => ($active ? theme.color.beige : 'transparent')};
  box-shadow: none;

  font-family: "Cormorant Infant";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  width: 100%;
  color: ${({ theme }) => theme.text.header};
  &:hover {
    background-color: ${({ theme }) => theme.color.beige};
    color: ${({ theme }) => theme.text.header};
  }
`;

const StyledLayout = styled(Layout)`
  & > #header {
    background-color: ${({ theme }) => theme.color.darkBeige};
  }
`;

const StyledContainer = styled(Container)`
  background-color: ${({ theme }) => theme.color.darkBeige};
`;

export default CatalogItemPage;

