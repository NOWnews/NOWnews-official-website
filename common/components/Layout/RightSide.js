import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const RightSide = ({ children }) => (
  <div className={css(styles.rightSide)} >
    { children }
  </div>
);

const styles = StyleSheet.create({
  rightSide: {
    float: 'right',
    overflow: 'hidden',
    width: 300
  }
});

RightSide.propTypes = {
  children: PropTypes.any.isRequired
};

export default RightSide;
