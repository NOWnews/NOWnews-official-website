import React from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const NotFound = () => (
  <div id='NotFound' className='center'>
    <img className={css(styles.notFoundImg)} src='/404.png' />
    <h1>找不到網頁或內容，回<Link to='/'>首頁</Link>看看吧！</h1>
  </div>
);


const styles = StyleSheet.create({
  notFoundImg: {
    width: '60%',
    margin: '20px 0'
  }
});
export default NotFound;
