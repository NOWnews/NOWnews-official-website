import React, { PropTypes } from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import { StyleSheet, css } from 'aphrodite/no-important';

const Logo = ({ customClass = css(styles.defaultBox) }) => (
  <div className={customClass}>
    <IndexLink to='/'>
      <img className={css(styles.img)} alt='NOWnews Logo' src='/logo.png' />
    </IndexLink>
  </div>
);

const styles = StyleSheet.create({
  defaultBox: {
    height: 70,
    minWidth: 250,
    width: 250,
    paddingBottom: 19.7,
    paddingRight: '1rem',
    paddingTop: 19.7
  },
  img: {
    height: '100%',
    width: '100%'
  }
});

Logo.propTypes = {
  customClass: PropTypes.string
};

export default Logo;
