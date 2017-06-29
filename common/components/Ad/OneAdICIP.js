import React from 'react';
import Helmet from 'react-helmet';

const OneAdICIP = () => (
  <div>
    <Helmet script={[
        {async: 'async', rel: 'stylesheet', src: 'https://legacy.nownews.com/NOWnews_static/onead_ic_ip.js'}
    ]} />
    <div id='oneadICIPTag' />
  </div>
);

export default OneAdICIP;
