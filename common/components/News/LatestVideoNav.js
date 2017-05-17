import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import ListItemSm from './ListItemSm';
import { Margin10 } from '../Layout';
import generateNewsUrl from '../../../lib/generateNewsUrl';

const LatestVideoNav = ({ list }) => {
  let items = list.map(({ sn, MainMenu, MainPhoto, shortTitle, formatStartedAt }, key) => {
    return (
      <div key={key} className={css(styles.item)}>
        <ListItemSm
          photo={MainPhoto}
          title={shortTitle}
          time={formatStartedAt}
          type='VIDEO'
          url={generateNewsUrl(sn, formatStartedAt)} />
      </div>
    );
  });

  return (
    <Margin10>
      <div className={css(styles.head)}>最新影音</div>
      <div>{ items }</div>
    </Margin10>
  );
};

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#FF8860',
    color: '#ffffff',
    fontSize: 16,
    height: 30,
    lineHeight: '30px',
    textAlign: 'center'
  }
});

LatestVideoNav.propTypes = {
  list: PropTypes.array.isRequired
};

export default LatestVideoNav;
