import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DFP } from '../Ad';
import { Logo, RightSide } from './components';
import { Container } from '../Layout';

export const LogoRow = ({ user }) => (
  <Container>
    <div className={css(styles.header)}>
      <Logo />
      <DFP className={css(styles.adBox)} opts={['/5799246/Nownews_all_200x70_LT_new2', [200, 70], 'div-gpt-ad-1496983081227-0']} />
      <DFP className={css(styles.adBox)} opts={['/5799246/Nownews_all_200x70_RT_new2', [200, 70], 'div-gpt-ad-1496983120685-0']} />
      <RightSide user={user} />
    </div>
  </Container>
);

const styles = StyleSheet.create({
  adBox: {
    textAlign: 'center',
    width: 225
  },
  header: {
    color: '#999',
    display: 'inline-flex'
  }
});

LogoRow.propTypes = {
  user: PropTypes.string
};

export default LogoRow;
