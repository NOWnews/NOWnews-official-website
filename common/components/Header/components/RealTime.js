import React from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite';

const RealTime = () => (
  <div className={css(styles.box)}>
    <span className={css(styles.text)}>即時跑馬燈</span>
    <Link className={css(styles.link)}>蝶戀花父子鞠躬道歉  承諾絕不逃避</Link>
    <span className={css(styles.split)}>｜</span>
    <Link className={css(styles.link)}>美女主播痛批工時制度  力挺司機</Link>
    <span className={css(styles.split)}>｜</span>
    <Link className={css(styles.link)}>蝶戀花周比蒼道歉：人車與友力無關</Link>
  </div>
);

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#0080FF',
    color: '#fff',
    display: 'inline-flex',
    height: 50,
    margin: '0.5rem 0 1rem 0'

  },
  link: {
    width: 272.5,
    height: 50,
    lineHeight: '50px',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6
    }
  },
  split: {
    height: 50,
    lineHeight: '50px'
  },
  text: {
    height: 50,
    lineHeight: '50px',
    width: 120,
    textAlign: 'center',
    borderRight: '1px solid #fff'
  }
});

export default RealTime;
