import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const FloatLeft = ({ children, style }) => (
  <div className={css(styles.floatLeft)} style={style} >
    { children }
  </div>
);

const styles = StyleSheet.create({
  floatLeft: {
    float: 'left'
  }
});

FloatLeft.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object
};

export default FloatLeft;
