import React, { PropTypes } from 'react';

// <img src='http://fakeimg.pl/300x250/' />
const Ad300x250 = ({ className = '' }) => (
  <div className={className} >
    <img src='/ad/300250.jpg' />
  </div>
);

Ad300x250.propTypes = {
  className: PropTypes.string
};

export default Ad300x250;
