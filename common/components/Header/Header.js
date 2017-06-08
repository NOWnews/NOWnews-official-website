import React, { PropTypes } from 'react';
import { Ad970x90 } from '../Ad';
import { InstantBar, Menu } from './components';
import LogoRow from './LogoRow';
import { Container } from '../Layout';

export const Header = ({ menus, currentMainMenu, currentChildMenu, marquee }) => (
  <Container>
    <LogoRow />
    <Menu menus={menus}
      currentMainMenu={currentMainMenu}
      currentChildMenu={currentChildMenu} />
    <InstantBar list={marquee} />
    <Ad970x90 />
  </Container>
);

Header.propTypes = {
  currentChildMenu: PropTypes.string,
  currentMainMenu: PropTypes.string,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired
};

export default Header;
