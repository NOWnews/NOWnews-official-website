import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Ad200x70, Ad970x90 } from '../Ad';
import { Logo, Menu, RightSide, RealTime } from './components';
import { Layout } from '../../style';
const { container } = Layout;

export const Header = () => (
  <div className={css(styles.container)}>
    <div className={css(styles.header)}>
      <Logo />
      <Ad200x70 />
      <Ad200x70 />
      <RightSide />
    </div>
    <Menu />
    <RealTime />
    <Ad970x90 />
  </div>
);

const styles = StyleSheet.create({
  ad: {
    textAlign: 'center',
    width: 230
  },
  container,
  header: {
    color: '#999',
    display: 'inline-flex'
  }
});
export default Header;
