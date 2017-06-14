import React, { PropTypes } from 'react';
import { InstantBar, Menu } from './components';
import { DFP } from '../Ad';
import { Container } from '../Layout';

export const Header = ({ adType, menus, currentMainMenu, currentChildMenu, marquee }) => (
  <Container>
    <Menu menus={menus}
      currentMainMenu={currentMainMenu}
      currentChildMenu={currentChildMenu} />
    <InstantBar list={marquee} />
    {adType && <DFP opts={[`/5799246/Nownews_${adType}_970x250_T_new2`, [[970, 90], [970, 250]]]} />}
  </Container>
);

Header.propTypes = {
  adType: PropTypes.string,
  currentChildMenu: PropTypes.string,
  currentMainMenu: PropTypes.string,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired
};

export default Header;
