import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const ClearFix = () => (
  <div className={css(styles.clear)} />
);

const styles = StyleSheet.create({
  clear: {
    clear: 'both'
  }
});

export default ClearFix;
