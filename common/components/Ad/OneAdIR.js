import React from 'react';
import Helmet from 'react-helmet';
const canUseDOM = !!(typeof window !== 'undefined' && window.document);

const OneAdIR = () => {
  if (canUseDOM && window.location.search.indexOf('ad=0') > -1) {
    return null;
  }
  return (
    <div>
      <Helmet script={[
          {async: 'async', rel: 'stylesheet', src: 'https://legacy.nownews.com/NOWnews_static/onead_ir.js'}
      ]} />
      <div id='oneadIRTag' />
    </div>
  );
};

export default OneAdIR;
