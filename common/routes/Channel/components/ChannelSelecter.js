import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

const ChannelSelecter = ({ channels, selectedChannel }) => {
  // temp Data
  channels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];

  let items = channels.map(({ sn, title = '今日整點報' }, key) => {
    let isActive = (key === selectedChannel.sn) ? css(styles.activeLink) : '';
    return (
      <Link key={key} className={`${css(styles.channelLink)} ${isActive}`}
        to={`/channel/${sn}`}>
        {title}
      </Link>
    );
  });

  return (
    <Margin10 className='center'>
      <button className={css(styles.selecter)}>
        <span className={css(styles.selType)}>特輯</span>
        <span className={css(styles.selTitle)}>{ selectedChannel.title }</span>
        <FontAwesome name='play' className={`fa-rotate-90 ${css(styles.selIcon)}`} size='2x' />
      </button>
      <div className={`clearfix ${css(styles.channelsBox)}`}>{ items }</div>
    </Margin10>
  );
};

const styles = StyleSheet.create({
  activeLink: {
    color: '#1886FB'
  },
  channelsBox: {
    background: '#ffffff',
    marginTop: 10,
    opacity: 0.8,
    padding: '10px 20px',
    position: 'absolute',
    textAlign: 'center',
    width: 970
  },
  channelLink: {
    color: '#000000',
    float: 'left',
    padding: '5px 0',
    textDecoration: 'none',
    width: 155,
    ':hover': {
      opacity: 0.6
    }
  },
  selecter: {
    backgroundImage: 'url("/bg/bg-channel-selecter.png")',
    backgroundRepeat: 'repeat-y',
    border: 0,
    cursor: 'pointer',
    height: 54,
    lineHeight: '54px',
    outline: 'none',
    position: 'relative',
    width: 327
  },
  selIcon: {
    position: 'absolute',
    top: 16.5,
    right: 30
  },
  selTitle: {
    fontSize: 20,
    left: 15,
    position: 'relative'
  },
  selType: {
    color: '#ffffff',
    fontSize: 25,
    left: 13,
    position: 'absolute'
  }
});

ChannelSelecter.propTypes = {
  channels: PropTypes.array.isRequired,
  selectedChannel: PropTypes.object.isRequired
};

export default ChannelSelecter;
