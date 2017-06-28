import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const AppleStyle = () => (
  <a target='_blank' href='https://itunes.apple.com/tw/app/nownews-v1/id388356807?mt=8'>
    <img className={css(styles.appBlock)} src='/app/ios.png' />
  </a>
);

const styles = StyleSheet.create({
  appBlock: {
    width: 300,
    height: 75
  }
});

export default AppleStyle;
