import React from 'react';
import Link from 'react-router/lib/Link';

const NotFound = () => (
  <div className='center'>
    <h1>找不到網頁或內容，回<Link to='/'>首頁</Link>看看吧！</h1>
    <iframe src='https://404page.missingkids.org.tw/api?key=svho5CZGyjQhEBespYqE' width='100%' height='635' frameBorder='0' />
  </div>
);

export default NotFound;
