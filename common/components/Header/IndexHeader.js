import React, { PropTypes } from 'react';
import { InstantBar, Menu } from './components';
import { DFP } from '../Ad';
import { Container } from '../Layout';

export const IndexHeader = ({ ad = '/5799246/Nownews_home_970x250_T_new2', menus, currentMainMenu, currentChildMenu, marquee, isDefaultTemplate = true }) => (
  <Container>
    <Menu menus={menus}
      currentMainMenu={currentMainMenu}
      currentChildMenu={currentChildMenu} />
    <InstantBar {...marquee} />
    {ad && <DFP opts={[ad, [[970, 90], [970, 250]]]} />}
  </Container>
);

IndexHeader.propTypes = {
  ad: PropTypes.string,
  currentChildMenu: PropTypes.string,
  currentMainMenu: PropTypes.string,
  isDefaultTemplate: PropTypes.bool,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default IndexHeader;
