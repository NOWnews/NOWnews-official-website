import React from 'react';
import Helmet from 'react-helmet';

const OneAd = () => (
  <div>
    <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞'
      script={[
        {async: 'async', rel: 'stylesheet', src: 'https://legacy.nownews.com/NOWnews_static/onead_ir.js'},
        {async: 'async', rel: 'stylesheet', src: 'https://legacy.nownews.com/NOWnews_static/onead_ic_ip.js'}
      ]} />
    <div id='oneadIRTag' />
    <div id='oneadICIPTag' />
  </div>
);

export default OneAd;
