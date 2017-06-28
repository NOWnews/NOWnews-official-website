import React from 'react';
import Helmet from 'react-helmet';

const OneAd = () => (
  <div>
    <Helmet script={[
        {async: 'async', rel: 'stylesheet', src: 'https://legacy.nownews.com/NOWnews_static/onead_ir.js'},
        {async: 'async', rel: 'stylesheet', src: 'https://legacy.nownews.com/NOWnews_static/onead_ic_ip.js'}
    ]} />
    <div id='oneadIRTag' />
    <div id='oneadICIPTag' />
  </div>
);

export default OneAd;
