import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const Container = ({ children }) => (
  <div className={css(styles.container)} >
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
  children: PropTypes.any.isRequired
};

export default Container;
