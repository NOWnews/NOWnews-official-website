import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Ad200x70 = () => (
  <div className={css(styles.box)}>
    <img src='http://fakeimg.pl/200x70/' />
  </div>
);

const styles = StyleSheet.create({
  box: {
    textAlign: 'center',
    width: 230
  }
});

export default Ad200x70;
