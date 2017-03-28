import React from 'react';
import Ad200x112 from '../../../components/Ad/Ad200x112';
import { StyleSheet, css } from 'aphrodite/no-important';
import ClearFloat from '../../../components/ClearFloat';

const RecommendAds = () => {
  var items = [];

  [0, 1, 2, 3, 4, 5].map((index) => {
    items.push(
      <div className={css(styles.item)} key={index}>
        <Ad200x112 />
        <div>一旦過敏被誘發 寶寶皮膚紅腫愛哭鬧</div>
      </div>
    );
  });

  return (
    <div>
      <h2>NOWnews 推薦</h2>
      <div>
        { items }
        <ClearFloat />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  item: {
    float: 'left',
    fontSize: 15,
    marginRight: 10,
    marginBottom: 15,
    width: 200
  }
});

export default RecommendAds;
