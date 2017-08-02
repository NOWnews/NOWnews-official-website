import React from 'react';
import DFP from './DFP';
// import Helmet from 'react-helmet';

// const OneAdICIP = () => (
//   <div>
//     <Helmet script={[
//         {async: 'async', rel: 'stylesheet', src: 'https://legacy.nownews.com/NOWnews_static/onead_ic_ip.js'}
//     ]} />
//     <div id='oneadICIPTag' />
//   </div>
// );

// 業務說用 DFP
const OneAdICIP = () => (
  <DFP opts={['/5799246/Nownews_PC_pushdown', [[970, 250], [1, 1]]]} />
);

export default OneAdICIP;
