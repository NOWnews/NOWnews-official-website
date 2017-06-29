import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import BlockItem from './BlockItem';
import { DFP } from '../Ad';
import Pagination from '../Pagination';

const BlockItems12 = ({ isDefaultTemplate = true, adCode, newsList, page, local }) => {
  let items = [];
  newsList.forEach(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, parseUrl, type }, key) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem
          category={MainMenu && MainMenu.name || 'Sponsored'}
          key={sn}
          photo={MainPhoto}
          title={shortTitle}
          time={formatStartedAt}
          type={type}
          url={parseUrl} />
      </div>
    );

    if (adCode && key === 1) {
      const RTAd = (isDefaultTemplate) ? `/5799246/Nownews_${adCode}_300x250_RT_new2` : `column_300x250_pu_${adCode}`;
      items.push(<DFP key={`Ad_RT`} className={css(styles.blockItem)}
        opts={[RTAd, [300, 250]]} />);
    } else if (adCode && key === 6) {
      const RBAd = (isDefaultTemplate) ? `/5799246/Nownews_${adCode}_300x250_RB_new2` : `column_300x250_pu_${adCode}`;
      items.push(<DFP key={`Ad_RB`} className={css(styles.blockItem)}
        opts={[RBAd, [300, 250]]} />);
    }
  });

  return (
    <div>
      <div className='clearfix'>
        { items }
      </div>
      {page && <Pagination {...page} {...local} />}
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    height: 245,
    marginBottom: 30,
    marginLeft: 11.5,
    marginRight: 11.5,
    width: 300
  }
});

BlockItems12.propTypes = {
  isDefaultTemplate: PropTypes.bool,
  local: PropTypes.object,
  adCode: PropTypes.string,
  newsList: PropTypes.array.isRequired,
  page: PropTypes.object
};

export default BlockItems12;
