import React from 'react';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import styled from 'styled-components';
import loadFAQs from '../../../HOCs/loadFAQs';
import Container from '../../container/container';
import ExpansionPanel from '../../expansionPanel/expansionPanel';
import Layout from '../components/layout';
import { editFAQ } from '../../../store/content/faqActions';
import Fab from '../components/fab';

const FaqBars = ({ data, editFAQ, navigate }) => {
  const newClickHandler = () => navigate('new');

  return (
    <Layout>
      {
        data.map(x => {
          const linkClickHandler = () => editFAQ(x);
          return (
            <Container key={x.id} direction='column' fullWidth>
              <Container>
                <Date>{x.date.toLocaleDateString()}</Date>
                <Separator>|</Separator>
                <EditLink onClick={linkClickHandler} to={`${x.id}`}>Edit</EditLink>
              </Container>
              <StyledPanel key={x.id} title={x.title} text={x.text} />
            </Container>
          );
        })
      }
      <Fab onClick={newClickHandler} />
    </Layout>
  );
}

const Date = styled.p``;

const Separator = styled.span`
  margin: 0 10px
`;

const StyledPanel = styled(ExpansionPanel)`
    margin-top: 0;
`;

const EditLink = styled(Link)`
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
    transition: 0.3s;
    :hover {
      color: ${({ theme }) => theme.text.mutted}; 
    }
`;

const mapStateToProps = ({ content: { faq: { bars }}}) => ({
  data: bars
});

const mapDispatchToProps = dispatch => ({
  editFAQ: item => dispatch(editFAQ(item))
});

export default loadFAQs(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FaqBars)
);
