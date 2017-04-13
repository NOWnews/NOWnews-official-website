import moment from 'moment';
import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ListItemSm from './ListItemSm';
import { Margin10 } from '../Layout';

const PersonalRightSide = ({ newsList }) => {
  let items = newsList.map(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt }, key) => {
    return (
      <div key={key} className={css(styles.blockItem)}>
        <ListItemSm
          category={MainMenu && MainMenu.name || '未分類'}
          photo={MainPhoto}
          title={shortTitle}
          time={moment(formatStartedAt).format('YYYY/MM/DD')}
          url={`/news/${moment(formatStartedAt).format('YYYYMMDD')}/${sn}`} />
      </div>
    );
  });

  return (
    <Margin10>
      <div className={`relative ${css(styles.switchIconArea)}`}>
        <div className={css(styles.background)} />
        <div className={css(styles.switchIcons)}>
          <img className={css(styles.icon)} src='/icons/instant.png' />
          <img className={css(styles.icon)} src='/icons/favorite.png' />
          <img className={css(styles.icon)} src='/icons/lbs_active.png' />
        </div>
        <div className={css(styles.mapTitle)}>台北市</div>
      </div>
      <div>{ items }</div>
    </Margin10>
  );
};

const styles = StyleSheet.create({
  background: {
    background: 'url(/bg/bg-personal-right-side.png)',
    height: 95,
    position: 'absolute',
    top: 40,
    width: 300,
    zIndex: -1
  },
  icon: {
    width: '80px',
    margin: '0 5px'
  },
  mapTitle: {
    color: '#0080ff',
    fontSize: '20px',
    fontWeight: 'bold',
    lineHeight: '20px',
    margin: '5px 30px',
    textAlign: 'right'
  },
  switchIconArea: {
    height: 140
  },
  switchIcons: {
    margin: '0 10px',
    textAlign: 'center'
  }
});

PersonalRightSide.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default PersonalRightSide;
