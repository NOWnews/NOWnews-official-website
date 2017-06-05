import moment from 'moment';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const Head = ({ newsBy = '', mainMenu, time, title, authorId, imgSrc }) => (
  <div className={css(styles.box)}>
    <div className={css(styles.content)}>
      <Link className={css(styles.category)}>{ mainMenu.name || '不分類' }</Link>
      <h1 className={css(styles.title)}>{ title }</h1>
      <div className={css(styles.authorArea)}>
        <Link to={`/author/${authorId}`} className={css(styles.authorArea)}>
          { imgSrc ? <img className={css(styles.avatar)} src={imgSrc} />
          : <FontAwesome name='user-circle' size='2x' style={{ position: 'relative', top: '4px' }} />
          }
          <span className={css(styles.author)}>{ newsBy }</span>
        </Link>
        <img className={css(styles.timeIcon)}src='/icons/grayClock.png' />
        <span>{moment(time).format('YYYY/MM/DD HH:MM')}</span>
      </div>
    </div>
  </div>
);

const styles = StyleSheet.create({
  author: {
    marginLeft: 5,
    marginRight: 15
  },
  authorArea: {
    color: '#747576',
    textDecoration: 'none'
  },
  box: {
    backgroundColor: '#F1F2F3'
  },
  category: {
    color: '#1886FB',
    fontSize: '20px'
  },
  content: {
    margin: '1rem auto',
    padding: '2rem 0',
    width: 900
  },
  timeIcon: {
    marginRight: 5,
    position: 'relative',
    top: 5
  },
  title: {
    margin: '5px 0'
  }
});

Head.propTypes = {
  authorId: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  newsBy: PropTypes.string.isRequired,
  mainMenu: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Head;
