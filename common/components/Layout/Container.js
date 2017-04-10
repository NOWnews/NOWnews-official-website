import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Container = ({ children, className }) => (
  <div className={`${className} ${css(styles.container)}`} >
    { children }
  </div>
);

const styles = StyleSheet.create({
  container: {
    margin: '0 auto',
    width: 970
  }
});

Container.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string
};

export default Container;
