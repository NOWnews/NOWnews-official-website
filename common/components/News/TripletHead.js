import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../Layout';

const TripletHead = ({ active, city }) => {
  const titles = {
    instant: '即時新聞',
    interest: '您感興趣的新聞',
    lbs: '地區新聞'
  };
  let linkIcons = ['instant', 'interest', 'lbs'].map((value) => {
    let imgName = (value === active) ? `${value}_active` : value;
    return (
      <Link to={value} key={value}>
        <img className={css(styles.icon)} src={`/icons/${imgName}.png`} title={titles[value]} />
      </Link>
    );
  });
  return (
    <Margin10 className={`relative ${css(styles.switchIconArea)}`}>
      <div className={css(styles.background)} />
      <div className={css(styles.switchIcons)}>
        {linkIcons}
        {city && <span className={css(styles.mapTitle)}>{city}</span>}
      </div>
    </Margin10>
  );
};

const styles = StyleSheet.create({
  background: {
    background: 'url(/bg/bg-personal-right-side.png)',
    height: 95,
    position: 'absolute',
    top: 55,
    width: '100%',
    zIndex: -1
  },
  icon: {
    width: '90px',
    margin: '0 10px'
  },
  mapTitle: {
    color: '#0080ff',
    fontSize: 40,
    fontWeight: 'bold',
    position: 'absolute',
    top: 27
  },
  switchIconArea: {
    height: 140
  },
  switchIcons: {
    margin: '0 10px',
    textAlign: 'center'
  }
});

TripletHead.propTypes = {
  active: PropTypes.string,
  city: PropTypes.string
};

export default TripletHead;
