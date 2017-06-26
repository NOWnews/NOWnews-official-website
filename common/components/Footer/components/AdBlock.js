import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export const AdBlock = ({ ad }) => (
  <a className={css(styles.box)} href={ad.url} target='_blank'>
    <div>
      <img src={ad.img} width='150' height='150' alt={ad.title} />
    </div>
    <div className={css(styles.title)}>{ad.title}</div>
  </a>
);

const styles = StyleSheet.create({
  box: {
    textAlign: 'center',
    textDecoration: 'none',
    width: 970 / 5
  },
  title: {
    color: '#fff',
    margin: '0 auto',
    width: 150
  }
});

AdBlock.propTypes = {
  ad: PropTypes.object
};

export default AdBlock;
