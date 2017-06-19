import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

const RecommendAds = ({ ads }) => {
  var items = [];

  ads.map((ad, index) => {
    items.push(
      <a className={css(styles.item)} key={index} href={ad.url} target='_blank'>
        <div>
          <img src={ad.img} width='200' height='112' />
        </div>
        <div>{ad.title}</div>
      </a>
    );
  });

  return (
    <div>
      <h2>NOWnews 推薦</h2>
      <div className='clearfix'>
        { items }
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  item: {
    color: '#000000',
    display: 'block',
    float: 'left',
    fontSize: 15,
    marginRight: 10,
    marginBottom: 15,
    textDecoration: 'none',
    width: 200
  }
});

RecommendAds.propTypes = {
  ads: PropTypes.array
};
export default RecommendAds;
