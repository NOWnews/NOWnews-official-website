import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const ClearFloat = () => (
  <div className={css(styles.clear)} />
);

const styles = StyleSheet.create({
  clear: {
    clear: 'both'
  }
});

export default ClearFloat;
