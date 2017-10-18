import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export const BlockAdItems3 = ({ ads, mainAdPosition = 'left' }) => {
  return (
    <div className={`clearfix ${css(styles.box)}`}>
      <div className={`${mainAdPosition} ${css(styles.balance)}`}>
        <div className={css(styles.oneAdBlock)}>
          <a href={ads[0].url} target='_blank'>
            <img className={css(styles.img)} src={ads[0].img} />
            <div className={css(styles.oneAdTitle)}>{ads[0].title}</div>
          </a>
        </div>
      </div>
      <div className={`${mainAdPosition} ${css(styles.balance)}`}>
        <div className={css(styles.twoAdBlock)}>
          <a href={ads[1].url} target='_blank'>
            <img width='160' height='130' src={ads[1].img} />
            <div className={css(styles.twoAdTitle)}>{ads[1].title}</div>
          </a>
        </div>
        <hr className={css(styles.line)} />
        <div className={css(styles.twoAdBlock)}>
          <a href={ads[2].url} target='_blank'>
            <img width='160' height='130' src={ads[2].img} />
            <div className={css(styles.twoAdTitle)}>{ads[2].title}</div>
          </a>
        </div>
      </div>
    </div>
  );
};
const maxWidth = 970;
const maxHeight = 290;
const titleFontSize = 19;

const styles = StyleSheet.create({
  box: {
    margin: '10px 0 20px'
  },
  balance: {
    height: maxHeight,
    width: maxWidth / 2,
    background: '#ffffff'
  },
  oneAdBlock: {
    height: '100%',
    position: 'relative'
  },
  oneAdTitle: {
    color: '#000000',
    fontSize: titleFontSize,
    position: 'absolute',
    bottom: -0.5,
    background: '#fec340',
    width: '100%',
    lineHeight: '50px',
    height: 50,
    opacity: 0.9,
    textDecoration: 'none',
    paddingLeft: 25
  },
  twoAdBlock: {
    height: '50%',
    padding: '5px 10px',
    position: 'relative'
  },
  twoAdTitle: {
    color: '#000000',
    display: 'inline-block',
    fontSize: titleFontSize,
    height: maxHeight / 2,
    padding: '40px 25px 0',
    position: 'absolute',
    right: 0,
    textDecoration: 'none',
    top: 0,
    width: '65%'

  },
  img: {
    width: 'auto',
    maxWidth: '100%',
    height: '100%'
  },
  line: {
    margin: '0px 10px'
  }
});

BlockAdItems3.propTypes = {
  ads: PropTypes.array.isRequired,
  mainAdPosition: PropTypes.string.isRequired
};

export default BlockAdItems3;
