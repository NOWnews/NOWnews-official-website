import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Ad200x70, Ad970x90 } from '../Ad';
import { InstantBar, Logo, Menu, RightSide } from './components';
import { Container } from '../Layout';

export const Header = ({ menus, currentMainMenu, currentChildMenu }) => (
  <Container>
    <div className={css(styles.header)}>
      <Logo />
      <Ad200x70 />
      <Ad200x70 />
      <RightSide />
    </div>
    <Menu menus={menus}
      currentMainMenu={currentMainMenu}
      currentChildMenu={currentChildMenu} />
    <InstantBar />
    <Ad970x90 />
  </Container>
);

const styles = StyleSheet.create({
  ad: {
    textAlign: 'center',
    width: 230
  },
  header: {
    color: '#999',
    display: 'inline-flex'
  }
});

Header.propTypes = {
  currentChildMenu: PropTypes.string,
  currentMainMenu: PropTypes.string,
  menus: PropTypes.array.isRequired
};

export default Header;
