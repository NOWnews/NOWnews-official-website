import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

const FontSize = () => (
  <Margin10>
    <hr className={css(styles.dottedLine)} />
    <button className={css(styles.btn)}>大</button>
    <button className={css(styles.btn)}>中</button>
    <button className={css(styles.btn)}>小</button>
  </Margin10>
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#F1F2F3',
    border: 0,
    color: '#1886FB',
    fontSize: 23,
    height: 40,
    width: 100,
    ':focus': {
      outline: 0
    },
    ':hover': {
      fontWeight: 'bold'
    }
  },
  dottedLine: {
    border: '1px #727374 dashed'
  }
});

export default FontSize;
