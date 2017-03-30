import React, { PropTypes } from 'react';
// import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const Slide = ({ newsList }) => (
  <div className={css(styles.box)}>
    Slide
  </div>
);

const styles = StyleSheet.create({
  box: {
    float: 'left',
    width: 670
  }
});

Slide.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default Slide;
