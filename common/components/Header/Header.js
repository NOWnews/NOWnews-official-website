import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Ad200x70, Ad970x90 } from '../Ad';
import { InstantBar, Logo, Menu, RightSide } from './components';
import { Container } from '../Layout';

export const Header = ({ menus }) => (
  <Container>
    <div className={css(styles.header)}>
      <Logo />
      <Ad200x70 />
      <Ad200x70 />
      <RightSide />
    </div>
    <Menu menus={menus.data || []} />
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
  menus: PropTypes.object.isRequired
};

export default Header;
