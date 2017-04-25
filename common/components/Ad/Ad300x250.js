import React, { PropTypes } from 'react';

const Ad300x250 = ({ className = '' }) => (
  <div className={className} >
    <img src='http://fakeimg.pl/300x250/' />
  </div>
);

Ad300x250.propTypes = {
  className: PropTypes.string
};

export default Ad300x250;
