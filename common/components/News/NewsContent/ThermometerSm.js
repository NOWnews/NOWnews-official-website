import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const ThermometerSm = ({ onWarm }) => (
  <div className='center' onClick={onWarm}>
    <img src='/icons/fire.png' />
    <div className={css(styles.fireWord)}>好喜歡 加點溫暖</div>
  </div>
);

const styles = StyleSheet.create({
  fireWord: {
    color: '#007AF2'
  }
});

ThermometerSm.propTypes = {
  onWarm: PropTypes.func.isRequired
};

export default ThermometerSm;
