import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const LeftSide = ({ children }) => (
  <div className={css(styles.leftSide)} >
    { children }
  </div>
);

const styles = StyleSheet.create({
  leftSide: {
    float: 'left',
    width: 670
  }
});

LeftSide.propTypes = {
  children: PropTypes.any.isRequired
};

export default LeftSide;
