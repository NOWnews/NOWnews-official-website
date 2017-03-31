import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const AppleStyle = () => (
  <div>
    <img className={css(styles.appBlock)} src='/app/ios.png' />
  </div>
);

const styles = StyleSheet.create({
  appBlock: {
    width: 300,
    height: 75
  }
});

export default AppleStyle;
