import React, { PropTypes } from 'react';
import ListItem from '../../../components/News/ListItem';
import { Margin10 } from '../../../components/Layout';

const RelatedContent = ({ ad, adKey, list, type }) => {
  let cloneList = [...list];
  let items = [];
  // 暫時廣告資料
  let sponsorNews = {
    formatStartedAt: (new Date()).toISOString(),
    isExternal: true,
    MainPhoto: {
      url: ad.img,
      height: 95,
      width: 170,
      desc: ad.title
    },
    sn: 'ad',
    parseUrl: ad.url,
    shortTitle: ad.title
  };

  // 將廣告有規律的安插在 array 裡面。
  cloneList.splice(adKey, 0, sponsorNews);
  cloneList.map((news) => {
    const { sn, isExternal, MainMenu, MainPhoto, shortTitle, formatStartedAt, parseUrl } = news;
    items.push(
      <ListItem
        isExternal={isExternal}
        key={sn}
        category={MainMenu && MainMenu.name || 'Sponsored'}
        photo={MainPhoto}
        title={shortTitle}
        time={formatStartedAt}
        url={parseUrl} />
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
  adKey: PropTypes.number.isRequired,
  ad: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default RelatedContent;
