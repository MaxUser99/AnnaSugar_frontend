import React from 'react';
import styled from 'styled-components';
import Layout from './layout';
import Container from '../container/container';
import ContentWrapper from '../contentWrapper/contentWrapper';
import TabMenu from '../tabMenu/tabMenu';
import { BREAKPOINTS, $maxWidth } from '../../theme';
import { useLocalization } from '../../hooks/useLocalization';

const FaqLayout = ({ title, tabs, children }) => {
  const { t } = useLocalization();
  console.log({ tabs })
  return (
    <StyledLayout>
      <HeaderBlock direction='column' fullWidth>
        <ContentWrapper justifyContent='center' alignItems='center'>
          <PageTitle>{t(title)}</PageTitle>
        </ContentWrapper>
        <MenuWrapper justifyContent='center' alignItems='center'>
          <TabMenu tabs={tabs} />
        </MenuWrapper>
      </HeaderBlock>
      <Container fullWidth>
        <ContentWrapper direction='column' alignItems='center' fullWidth>
          { children }
        </ContentWrapper>
      </Container>
    </StyledLayout>
  );
}

const MenuWrapper = styled(ContentWrapper)`
  ${ $maxWidth(BREAKPOINTS.TABLET, 'padding: 0;')}
`;

const StyledLayout = styled(Layout)`
  & #header {
    background-color: ${({ theme }) => theme.color.darkBeige};
  }
`;

const HeaderBlock = styled(Container)`
  background-color: ${({ theme }) => theme.color.darkBeige};
`;

const PageTitle = styled.h1`
  margin: 20px 0 64px;
  font-family: Cormorant Infant;
  font-weight: bold;
  font-size: 68px;
  line-height: 68px;
  text-align: center;
  color: ${({ theme }) => theme.text.header};
  ${ $maxWidth(BREAKPOINTS.TABLET, `
    font-size: 48px;
    line-height: 48px;
  `)}
`;

export default FaqLayout;
