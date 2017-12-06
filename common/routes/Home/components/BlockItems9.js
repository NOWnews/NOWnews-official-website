import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';

class BlockItems9 extends PureComponent {
  render () {
    const { ads, hasAd, newsList, tripletType } = this.props;
    const transformAdFormat = (ad) => {
      const { id, img, menu, title, url } = ad;
      return {
        isExternal: true,
        sn: `promote${id}`,
        shortTitle: title,
        formatStartedAt: (new Date()).toISOString(),
        parseUrl: url,
        MainMenu: { name: menu },
        MainPhoto: { thumbnail: 'https://imgapiv2.nownews.com/?w=300&q=70&src=' + img }
      };
    };

    let list = hasAd ? newsList.slice(0, 6) : newsList;

    if (hasAd) {
      list.splice(2, 0, transformAdFormat(ads[0]));
      list.splice(4, 0, transformAdFormat(ads[1]));
      list.splice(6, 0, transformAdFormat(ads[2]));
    }

    const items = list.map(({ isExternal, sn, MainMenu, MainPhoto, shortTitle, formatStartedAt, parseUrl, type }) => {
      const url = isExternal ? parseUrl : `${parseUrl}?from=${tripletType}`;
      return (
        <div key={sn} className={css(styles.blockItem)}>
          <BlockItem key={sn}
            category={MainMenu && MainMenu.name || 'Sponsored'}
            data-on='click' data-event-category='home' data-event-action={tripletType}
            photo={MainPhoto}
            title={shortTitle}
            type={type}
            time={formatStartedAt}
            target={isExternal === true ? '_blank' : null}
            url={url} />
        </div>
      );
    });

    return (
      <div className='clearfix'>
        { items }
      </div>
    );
  }
};

const styles = StyleSheet.create({
  blockItem: {
    background: '#F3F4F5',
    float: 'left',
    margin: 11.5,
    paddingBottom: 10,
    width: 300
  }
});

BlockItems9.propTypes = {
  tripletType: PropTypes.string.isRequired,
  ads: PropTypes.array.isRequired,
  hasAd: PropTypes.bool.isRequired,
  newsList: PropTypes.array.isRequired
};

export default BlockItems9;
