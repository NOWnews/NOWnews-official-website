import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const AndroidStyle = () => (
  <a target='_blank' href='https://play.google.com/store/apps/details?id=com.nownews&hl=zh_TW'>
    <img className={css(styles.appBlock)} src='/app/android.png' />
  </a>
);

const styles = StyleSheet.create({
  appBlock: {
    width: 300,
    height: 75
  }
});

export default AndroidStyle;
