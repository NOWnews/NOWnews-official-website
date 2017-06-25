import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const GarbBag = () => {
  const list = [
    { isExternal: true, title: '網頁遊戲', url: 'http://nownews.nicegame.com.tw/' },
    { isExternal: true, title: '旅食樂', url: 'http://play.nownews.com/' },
    { isExternal: true, title: '飆網超省', url: 'https://www.kbro.com.tw/K01/cm-promo-more-2_3_0_6_3.html?&mkwid=bPIzZHwz' },
    { isExternal: true, title: '購屋通', url: 'http://www.cthouse.com.tw/?utm_source=nownews&utm_medium=text&utm_content=navigation&utm_campaign=nownews' }
  ];

  const items = list.map(({ title, url }, key) => {
    return (
      <a className={css(styles.item)}
        href={url}
        target='_blank'
        key={key}>
        {title}
      </a>
    );
  });

  return (
    <div className={css(styles.box)}>
      <div className={css(styles.title)}>好康報報</div>
      <div className={css(styles.items)}>{ items }</div>
    </div>
  );
};

const styles = StyleSheet.create({
  box: {
  },
  title: {
    background: '#00A0D1',
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    padding: '10px'
  },
  item: {
    background: '#00A0D1',
    border: 0,
    borderRadius: 20,
    color: '#ffffff',
    cursor: 'pointer',
    float: 'left',
    fontSize: 16,
    padding: '7px 0',
    margin: '4px 15px',
    textDecoration: 'none',
    transition: '.2s opacity ease',
    width: 120,
    ':hover': {
      opacity: 0.6
    }
  },
  items: {
    background: '#E9EAEB',
    clear: 'both',
    height: 108,
    padding: '10px 0',
    textAlign: 'center',
    width: '100%'
  }
});

export default GarbBag;
