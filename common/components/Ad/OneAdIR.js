import React from 'react';
import Helmet from 'react-helmet';

const OneAdIR = () => (
  <div>
    <Helmet script={[
        {async: 'async', rel: 'stylesheet', src: '/ad/onead_ir.js'}
    ]} />
    <div id='oneadIRTag' />
  </div>
);

export default OneAdIR;
