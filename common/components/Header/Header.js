import React, { PropTypes } from 'react';
import { DFP } from '../Ad';
import { InstantBar, Menu } from './components';
import { Container } from '../Layout';

export const Header = ({ menus, currentMainMenu, currentChildMenu, marquee }) => (
  <Container>
    <Menu menus={menus}
      currentMainMenu={currentMainMenu}
      currentChildMenu={currentChildMenu} />
    <InstantBar list={marquee} />
    <DFP opts={['/5799246/Nownews_home_970x250_T_new2', [[970, 90], [970, 250]], 'div-gpt-ad-1496983147535-0']} />
  </Container>
);

Header.propTypes = {
  currentChildMenu: PropTypes.string,
  currentMainMenu: PropTypes.string,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired
};

export default Header;
