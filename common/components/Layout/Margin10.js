import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Margin10 = ({ children, className = '' }) => (
  <div className={`${className} ${css(styles.margin10)}`} >
    { children }
  </div>
);

const styles = StyleSheet.create({
  margin10: {
    padding: '10px 0'
  }
});

Margin10.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};

export default Margin10;
