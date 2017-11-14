import React, { PropTypes } from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import { StyleSheet, css } from 'aphrodite/no-important';

const Logo = ({ customClass = css(styles.defaultBox) }) => (
  <div className={customClass}>
    <IndexLink to='/' data-event-category='common' data-event-action='logo'>
      <img className={css(styles.img)} alt='NOWnews Logo' src='/logo.jpg' />
    </IndexLink>
  </div>
);

const styles = StyleSheet.create({
  defaultBox: {
    height: 80,
    minWidth: 205,
    width: 205,
    paddingTop: 10,
    paddingBottom: 15,
    paddingRight: '1rem'
  },
  img: {
    height: '100%'
  }
});

Logo.propTypes = {
  customClass: PropTypes.string
};

export default Logo;
