import React from 'react';
import Container from './Container';

const Loading = () => (
  <Container className='center'>
    <div>
      <img alt='Loading' src='/others/loading.gif' />
    </div>
    <span className='h3'>載入中 ... </span>
  </Container>
);

export default Loading;
