import moment from 'moment';
import React, { PropTypes } from 'react';
import ListItem from '../../../components/News/ListItem';
import { StyleSheet, css } from 'aphrodite/no-important';

const ReleatedContent = ({ list, type }) => {
  var cloneList = [...list];
  var items = [];
  // 暫時廣告資料
  var fakeSponsorNews = {
    formatStartedAt: new Date(),
    MainPhoto: null,
    sn: 999999,
    shortTitle: ' 一旦過敏被誘發 寶寶皮膚紅腫愛哭鬧'
  };

  var randomIndex = Math.floor((Math.random() * 3));
  cloneList.splice(randomIndex, 0, fakeSponsorNews);
  cloneList.map((news) => {
    let { sn, MainMenu, MainPhoto, shortTitle, formatStartedAt } = news;
    items.push(
      <ListItem
        key={sn}
        category={MainMenu && MainMenu.name || 'Sponsored'}
        photo={MainPhoto}
        title={shortTitle}
        time={moment(formatStartedAt).format('YYYY/MM/DD')}
        url={`/news/${moment(formatStartedAt).format('YYYYMMDD')}/${sn}`} />
    );
  });

  return (
    <div className={css(styles.box)}>
      <h2 >{ type }</h2>
      <div>{ items }</div>
    </div>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: '1rem'
  }
});

ReleatedContent.propTypes = {
  list: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default ReleatedContent;
