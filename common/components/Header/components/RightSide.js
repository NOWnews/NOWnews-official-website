import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const Nav = () => {
  const socialList = [
    { icon: 'FB', url: 'https://facebook.com/nownews' },
    { icon: 'IG', url: 'https://www.instagram.com/nownews/' },
    { icon: 'weibo', url: 'http://tw.weibo.com/nownews' }
  ];
  return (
    <div className={`right ${css(styles.box)}`}>
      <Link className={css(styles.link)} to='/search'>
        <FontAwesome name='search' size='2x' />
      </Link>
      <Link className={css(styles.link)} to='/user'>
        <FontAwesome name='user-circle-o' size='2x' />
        <div className={css(styles.account)}>Account</div>
      </Link>
      {socialList.map(({ icon, url }) =>
        <Link className={css(styles.btnSocial)} key={icon} target='_blank' to={url}>
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
    margin: 'auto 0 auto 10px'
  },
  btnSocial: {
    marginLeft: 10
  },
  link: {
    color: '#999999',
    marginRight: 13,
    textDecoration: 'none',
    ':hover': {
      color: '#0080FF'
    }

  }
});

export default Nav;
