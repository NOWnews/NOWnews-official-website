import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem } from '../../../components/News';
import { ClearFix } from '../../../components/Layout';
import { Ad300x250 } from '../../../components/Ad';

const BlockItems = ({ newsList }) => {
  var items = [];

  newsList.map((news, key) => {
    let { category, photo = {}, sn, time, title, url } = news;
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem
          category={category}
          key={sn}
          photo={photo}
          title={title}
          time={time}
          url={url} />
      </div>
    );

    if (key === 1 || key === 6) {
      items.push(<Ad300x250 key={`Ad${key}`} className={css(styles.blockItem)} />);
    }
  });

  return (
    <div className={css(styles.box)}>
      { items }
      <ClearFix />
    </div>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 25
  },
  blockItem: {
    float: 'left',
    height: 250,
    marginBottom: 30,
    marginRight: 70 / 2,
    width: 300
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
