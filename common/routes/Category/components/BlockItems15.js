import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import BlockItem from '../../../components/News/BlockItem';
import Pagination from '../../../components/Pagination';
import { DFP } from '../../../components/Ad';

const BlockItems15 = ({ adCode, newsList, page, local, category }) => {
  let items = [];
  const eventCategory = `cat-${category}`;
  newsList.forEach(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, parseUrl, type }, key) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem
          data-on='click' data-event-category={eventCategory} data-event-action='list'
          category={MainMenu && MainMenu.name || 'Sponsored'}
          key={sn}
          photo={MainPhoto}
          title={shortTitle}
          time={formatStartedAt}
          type={type}
          url={`${parseUrl}?from=${category}list`} />
      </div>
    );

    if (adCode && key === 1) {
      const PUAD = `/5799246/column_300x250_pu_${adCode}`;
      items.push(<DFP key={`Ad_RT`} className={css(styles.blockItem)} opts={[PUAD, [300, 250]]} />);
    } else if (adCode && key === 6) {
      const PDAD = `/5799246/column_300x250_pd_${adCode}`;
      items.push(<DFP key={`Ad_RB`} className={css(styles.blockItem)} opts={[PDAD, [300, 250]]} />);
    } else if (adCode && key === 14) {
      const PDDAD = `/5799246/column_300x250_pdd_${adCode}`;
      items.push(<DFP key={`AD_PDD`} className={css(styles.blockItem)} opts={[PDDAD, [300, 250]]} />);
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

BlockItems15.propTypes = {
  local: PropTypes.object,
  adCode: PropTypes.string,
  category: PropTypes.string,
  newsList: PropTypes.array.isRequired,
  page: PropTypes.object
};

export default BlockItems15;
