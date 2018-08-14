import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import StaticContainer from 'react-static-container';

const RecommendAds = ({ ads }) => {
  var items = [];

  ads.map((ad, index) => {
    // gif file check format.
    let adImgFormat = {ad.img};

    if (ad.img.indexOf('.gif') > 0) {
      adImgFormat = ad.img;
    }

    items.push(
      <a className={css(styles.item)} key={index} href={ad.url} target='_blank'
        data-on='click' data-event-category='ad' data-event-action='page-recommend-ad'>
        <div>
          <img src={adImgFormat} width='200' height='112' alt={ad.title} />
        </div>
        <div className={css(styles.title)}>{ad.title}</div>
      </a>
    );
  });

  return (
    <StaticContainer>
      <div>
        <h2>NOWnews 推薦</h2>
        <div className='clearfix'>
          { items }
        </div>
      </div>
    </StaticContainer>
  );
};

const styles = StyleSheet.create({
  item: {
    color: '#000000',
    display: 'block',
    float: 'left',
    fontSize: 15,
    marginRight: 10,
    marginBottom: 5,
    textDecoration: 'none',
    width: 200
  },
  title: {
    height: 40
  }
});

RecommendAds.propTypes = {
  ads: PropTypes.array
};
export default RecommendAds;
