import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tab from './tab';
import Container from '../container/container';
import { $maxWidth } from '../../theme';

const TabMenu = ({ tabs }) => {
  return (
    <Menu
      justifyContent='center'
      alignItems='center'
      fullWidth>
      {
        tabs.map(({ title, href }) => (
          <Tab key={href} href={href}>
            {title}
          </Tab>
        ))
      }
    </Menu>
  );
}

const Menu = styled(Container)`
  overflow: hidden;
  justify-content: flex-start;
  padding: 0 10px;
  ${ $maxWidth(788, 'flex-wrap: wrap;')}

`;

TabMenu.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string
  }))
};

export default TabMenu;
