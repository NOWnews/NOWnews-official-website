import moment from 'moment';
import React, { PropTypes } from 'react';
import ListItem from '../../../components/News/ListItem';
import { Margin10 } from '../../../components/Layout';
import generateNewsUrl from '../../../../lib/generateNewsUrl';

const RelatedContent = ({ list, sn, type }) => {
  let cloneList = [...list];
  let items = [];
  // 暫時廣告資料
  let fakeSponsorNews = {
    formatStartedAt: new Date(),
    MainPhoto: {},
    sn: 999999,
    shortTitle: '一旦過敏被誘發 寶寶皮膚紅腫愛哭鬧'
  };

  // 將廣告有規律的安插在 array 裡面。
  cloneList.splice(sn % 3, 0, fakeSponsorNews);
  cloneList.map((news) => {
    let { sn, MainMenu, MainPhoto, shortTitle, formatStartedAt } = news;
    items.push(
      <ListItem
        key={sn}
        category={MainMenu && MainMenu.name || 'Sponsored'}
        photo={MainPhoto}
        title={shortTitle}
        time={moment(formatStartedAt).format('YYYY/MM/DD')}
        url={generateNewsUrl(sn, formatStartedAt)} />
    );
  });

  return (
    <Margin10>
      <h2>{ type }</h2>
      <div>{ items }</div>
    </Margin10>
  );
};

RelatedContent.propTypes = {
  list: PropTypes.array.isRequired,
  sn: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};

export default RelatedContent;
