import React from 'react';
import styled from 'styled-components';
import { Link as BrowserLink } from 'gatsby';
import { BREAKPOINTS, $maxWidth } from '../../theme';
import { useLocalization } from '../../hooks/useLocalization';

const Breadscrumb = ({ breadscrumbs }) => {
  const { t } = useLocalization();

  const LinkClickHandler = isDisabled => e => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <List>
      {
        breadscrumbs.map(({ title, href, disabled }, i) => {
          const showSlash = i < breadscrumbs.length - 1;
          return <React.Fragment key={`${href}${i}`}>
            <Item>
              <Link
                to={href}
                onClick={LinkClickHandler(disabled)}
                disabled={disabled}>
                {t(title)}
              </Link>
            </Item>
            { showSlash && '/' }
          </React.Fragment>
        })
      }
    </List>
  );
};

const List = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  // margin-right: auto
  padding: 0;
  margin: 10px auto 0 0;
  ${ $maxWidth(BREAKPOINTS.DESCTOP, 'display: none;')}
`;

const Item = styled.li`
  font-size: 14px;
  line-height: 14px;
  &:not(:last-child) {
    padding-right: 16px;
  }
  &:not(:first-child) {
    padding-left: 16px;
  }
`;

const Link = styled(BrowserLink)`
  color: ${({ theme, disabled }) => (disabled ? theme.text.mutted : theme.text.lighter2)};
  text-decoration: none;
`;

export default Breadscrumb;
