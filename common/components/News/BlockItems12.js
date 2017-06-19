import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import BlockItem from './BlockItem';
import { DFP } from '../Ad';
import Pagination from '../Pagination';

const BlockItems12 = ({ adType, newsList, page, local }) => {
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

    if (adType && key === 1) {
      items.push(<DFP key={`Ad_RT`} className={css(styles.blockItem)}
        opts={[`/5799246/Nownews_${adType}_300x250_RT_new2`, [300, 250]]} />);
    } else if (adType && key === 6) {
      items.push(<DFP key={`Ad_RB`} className={css(styles.blockItem)}
        opts={[`/5799246/Nownews_${adType}_300x250_RB_new2`, [300, 250]]} />);
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
  local: PropTypes.object,
  adType: PropTypes.string,
  newsList: PropTypes.array.isRequired,
  page: PropTypes.object
};

export default BlockItems12;
