import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite';

const Head = ({ newsBy = '', mainMenu, title }) => (
  <div className={css(styles.box)}>
    <div className={css(styles.content)}>
      <Link className={css(styles.category)}>{ mainMenu.name || '不分類' }</Link>
      <h1 className={css(styles.title)}>{ title }</h1>
      <div>
        <FontAwesome name='user-circle' size='2x' />
        <span className={css(styles.author)}>{ newsBy }</span>
        <FontAwesome name='clock-o' />
        <span className={css(styles.time)}>2017/1/1 09:45</span>
      </div>
    </div>
  </div>
);

const styles = StyleSheet.create({
  author: {
    marginLeft: 5
  },
  box: {
    backgroundColor: '#F1F2F3'
  },
  category: {
    color: '#1886FB',
    fontSize: '13px'
  },
  content: {
    margin: '1rem auto',
    padding: '2rem 0',
    width: 900
  },
  time: {
    marginLeft: 5
  },
  title: {
    margin: '5px 0'
  }
});

Head.propTypes = {
  newsBy: PropTypes.string.isRequired,
  mainMenu: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired
};

export default Head;
