import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

// <img src='http://fakeimg.pl/200x70/' />
const Ad200x70 = () => (
  <div className={css(styles.box)}>
    <img src='/ad/20070-1.jpg' />
  </div>
);

const styles = StyleSheet.create({
  box: {
    textAlign: 'center',
    width: 230
  }
});

export default Ad200x70;
