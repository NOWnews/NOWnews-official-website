import React, { PureComponent, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

class RightSide extends PureComponent {
  render () {
    // const { user } = this.props;
    const socialList = [
      { icon: 'weibo', url: 'http://tw.weibo.com/nownews' },
      { icon: 'IG', url: 'https://www.instagram.com/nownews/' },
      { icon: 'FB', url: 'https://facebook.com/nownews' }
    ];
    // const memberLink = user ? '/auth/me' : '/auth/oauth';
    return (
      <div className={`clearfix ${css(styles.box)}`}>
        <Link className={css(styles.link)} to='/search?timeRange=lastWeek'>
          <FontAwesome name='search' size='2x' />
        </Link>
        {/* 隱藏會員相關 */}
        {/* <Link className={css(styles.link)} to={memberLink}>
          <FontAwesome name='user-circle-o' size='2x' />
          <div className={css(styles.account)}>{user ? '會員資料' : '加入會員'}</div>
        </Link> */}
        {socialList.map(({ icon, url }) =>
          <Link className={`right ${css(styles.btnSocial)}`} key={icon} target='_blank' to={url}>
            <img src={`/social/${icon}.png`} alt={icon} />
          </Link>
        )}
      </div>
    );
  }
};

const styles = StyleSheet.create({
  account: {
    display: 'inline-block',
    fontSize: 14,
    height: 32,
    lineHeight: '32px',
    left: 4,
    position: 'relative',
    top: -7.5
  },
  box: {
    margin: '20px 0 20px 10px',
    width: 270
  },
  btnSocial: {
    marginRight: 10
  },
  link: {
    color: '#999999',
    marginLeft: 110,
    position: 'relative',
    top: -3,
    textDecoration: 'none',
    ':hover': {
      color: '#0080FF'
    }
  }
});

RightSide.propTypes = {
  user: PropTypes.string
};

export default RightSide;
