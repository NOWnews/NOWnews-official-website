import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

const Thermometer = ({ onWarm, pv = 1 }) => {
  const maxPv = 10000;
  const positionRate = (pv >= maxPv) ? 90 : (pv / maxPv) * 100 * 0.9;
  const pointerPosition = {
    left: `${positionRate}%`
  };
  return (
    <Margin10 className='center'>
      <label className={css(styles.label)}>新聞溫度計</label>
      <hr className={css(styles.dottedLine)} />
      <div className='relative'>
        <img className={css(styles.thermometerPointer)}
          src='/others/thermometer-pointer.png'
          style={pointerPosition} />
        <img className={css(styles.thermometerBar)} src='/others/thermometer-bar.png' />
      </div>
      <div className={css(styles.wramBtn)} onClick={onWarm}>
        <img src='/icons/fire.png' />
        <span className={css(styles.fireWord)}>需要溫暖</span>
      </div>
    </Margin10>
  );
};

const styles = StyleSheet.create({
  dottedLine: {
    border: '1px #727374 dashed'
  },
  fireWord: {
    color: '#007AF2',
    fontSize: 17,
    left: 10,
    position: 'relative',
    top: -35
  },
  label: {
    color: '#727374',
    fontSize: 17
  },
  thermometerBar: {
    marginTop: 15
  },
  thermometerPointer: {
    top: -7,
    position: 'absolute',
    zIndex: 2
  },
  wramBtn: {
    cursor: 'pointer'
  }

});

Thermometer.propTypes = {
  onWarm: PropTypes.func.isRequired,
  pv: PropTypes.number
};

export default Thermometer;
