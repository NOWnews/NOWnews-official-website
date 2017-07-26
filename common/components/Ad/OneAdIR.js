import React from 'react';
import Helmet from 'react-helmet';

// 業務說用 <DFP opts={['/5799246/Nownews_PC_pushdown', [[970, 250], [1, 1]]]} />
const OneAdIR = () => (
  <div>
    <Helmet script={[
        {async: 'async', rel: 'stylesheet', src: 'https://legacy.nownews.com/NOWnews_static/onead_ir.js'}
    ]} />
    <div id='oneadIRTag' />
  </div>
);

export default OneAdIR;
