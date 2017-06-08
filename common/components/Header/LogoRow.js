import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Ad200x70 } from '../Ad';
import { Logo, RightSide } from './components';
import { Container } from '../Layout';

export const LogoRow = ({ user }) => (
  <Container>
    <div className={css(styles.header)}>
      <Logo />
      <Ad200x70 />
      <Ad200x70 />
      <RightSide user={user} />
    </div>
  </Container>
);

const styles = StyleSheet.create({
  header: {
    color: '#999',
    display: 'inline-flex'
  }
});

LogoRow.propTypes = {
  user: PropTypes.string
};

export default LogoRow;
