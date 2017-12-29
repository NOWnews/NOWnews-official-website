import React, { PropTypes } from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import { StyleSheet, css } from 'aphrodite/no-important';

const Logo = ({ customClass = css(styles.defaultBox) }) => (
  <div className={customClass}>
    <IndexLink to='/' data-on='click' data-event-category='common' data-event-action='logo'>
      <img className={css(styles.img)} alt='NOWnews Logo' src='/10yearslogo.png' />
    </IndexLink>
  </div>
);

const styles = StyleSheet.create({
  defaultBox: {
    height: 70,
    minWidth: 220,
    width: 220
  },
  img: {
    width: '100%'
  }
});

Logo.propTypes = {
  customClass: PropTypes.string
};

export default Logo;
