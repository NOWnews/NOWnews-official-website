import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const FloatRight = ({ children, style }) => (
  <div className={css(styles.floatRight)} style={style} >
    { children }
  </div>
);

const styles = StyleSheet.create({
  floatRight: {
    float: 'right'
  }
});

FloatRight.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object
};

export default FloatRight;
