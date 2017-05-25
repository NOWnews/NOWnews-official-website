import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const Nav = () => {
  const socialList = [
    { icon: 'weibo', url: 'http://tw.weibo.com/nownews' },
    { icon: 'IG', url: 'https://www.instagram.com/nownews/' },
    { icon: 'FB', url: 'https://facebook.com/nownews' }
  ];
  return (
    <div className={`clearfix ${css(styles.box)}`}>
      <Link className={css(styles.link)} to='/search?timeRange=lastWeek'>
        <FontAwesome name='search' size='2x' />
      </Link>
      <Link className={css(styles.link)} to='/user'>
        <FontAwesome name='user-circle-o' size='2x' />
        <div className={css(styles.account)}>Account</div>
      </Link>
      {socialList.map(({ icon, url }) =>
        <Link className={`right ${css(styles.btnSocial)}`} key={icon} target='_blank' to={url}>
          <img src={`/social/${icon}.png`} alt={icon} />
        </Link>
      )}
    </div>
  );
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
    margin: 'auto 0 auto 10px',
    width: 270
  },
  btnSocial: {
    marginRight: 10
  },
  link: {
    color: '#999999',
    marginLeft: 10,
    textDecoration: 'none',
    ':hover': {
      color: '#0080FF'
    }
  }
});

export default Nav;
