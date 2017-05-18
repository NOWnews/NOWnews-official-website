import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import moment from 'moment';
import TypeIcon from '../../../components/News/TypeIcon';
import Pagination from '../../../components/Pagination';

const BlockItems9 = ({ newsList, page }) => {
  const items = newsList.map(({ sn, MainPhoto, shortTitle, startedAt }) => {
    return (
      <div key={sn} className={css(styles.blockItem)}>
        <TypeIcon type='VIDEO' />
        <img className={css(styles.img)} src={MainPhoto.url} />
        <div className={css(styles.bottom)}>
          <div className={css(styles.title)}>{shortTitle}</div>
          <img src='/icons/whiteClock.png' />
          <span className={css(styles.time)}>
            {moment(startedAt).format('YYYY/MM/DD')}
          </span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className='clearfix'>
        { items }
      </div>
      <Pagination {...page} />
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    color: '#000',
    float: 'left',
    height: 245,
    marginBottom: 30,
    marginLeft: 11.5,
    marginRight: 11.5,
    position: 'relative',
    width: 300
  },
  img: {
    height: 168,
    marginBottom: 5,
    maxWidth: '100%',
    maxHeight: 168,
    width: '100%'
  },
  title: {
    margin: '5px 0'
  },
  time: {
    color: '#888',
    fontSize: 13,
    marginLeft: 5,
    marginTop: 5,
    position: 'relative',
    top: -2
  }
});

BlockItems9.propTypes = {
  newsList: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired
};

export default BlockItems9;
