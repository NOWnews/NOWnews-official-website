import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';

const BlockItems9 = ({ ads, hasAd, newsList }) => {
  const transformAdFormat = (ad) => {
    const { id, img, menu, title, url } = ad;
    return {
      isExternal: true,
      sn: `promote${id}`,
      shortTitle: title,
      formatStartedAt: (new Date()).toISOString(),
      parseUrl: url,
      MainMenu: { name: menu },
      MainPhoto: { url: img }
    };
  };

  let list = hasAd ? newsList.slice(0, 6) : newsList;

  if (hasAd) {
    list.splice(2, 0, transformAdFormat(ads[0]));
    list.splice(4, 0, transformAdFormat(ads[1]));
    list.splice(6, 0, transformAdFormat(ads[2]));
  }

  const items = list.map(({ isExternal, sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, parseUrl, type }) => {
    return (
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem key={sn}
          category={MainMenu && MainMenu.name || 'Sponsored'}
          photo={MainPhoto}
          title={shortTitle}
          type={type}
          time={formatStartedAt}
          target={isExternal === true ? '_blank' : null}
          url={parseUrl} />
      </div>
    );
  });

  return (
    <div className='clearfix'>
      { items }
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    background: '#ffffff',
    float: 'left',
    margin: 11.5,
    paddingBottom: 10,
    width: 300
  }
});

BlockItems9.propTypes = {
  ads: PropTypes.array.isRequired,
  hasAd: PropTypes.bool.isRequired,
  newsList: PropTypes.array.isRequired
};

export default BlockItems9;
