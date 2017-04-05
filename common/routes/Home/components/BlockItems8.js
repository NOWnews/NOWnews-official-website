import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { BlockItem8 } from '../../../components/News';
import { ClearFix } from '../../../components/Layout';

const BlockItems = ({ newsList }) => {
  let items = [];
  newsList.map(({ sn, MainPhoto, title }) => {
    items.push(
      <div key={sn} className={css(styles.blockItem)}>
        <BlockItem8 key={sn}
          photo={MainPhoto}
          title={title} />
      </div>
    );
  });

  return (
    <div>
      { items }
      <ClearFix />
    </div>
  );
};

const styles = StyleSheet.create({
  blockItem: {
    float: 'left',
    margin: '10px 11.5px',
    width: 300,
    position: 'relative'
  }
});

BlockItems.propTypes = {
  newsList: PropTypes.array.isRequired
};

export default BlockItems;
