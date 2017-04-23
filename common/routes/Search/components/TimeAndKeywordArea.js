import React, { PropTypes } from 'react';
// import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const TimeAndKeywordArea = ({ newsList }) => (
  <div className={`left ${css(styles.leftArea)}`}>
    <label className={css(styles.groupTitle)}>時間搜尋</label>
    <hr className={css(styles.dottedLine)} />
    <ul className={css(styles.groupBox)}>
      <li className={css(styles.groupItem)}>過去一週</li>
      <li className={css(styles.groupItem)}>過去一個月</li>
      <li className={css(styles.groupItem)}>過去一年</li>
    </ul>
    <br />
    <label className={css(styles.groupTitle)}>熱門搜尋</label>
    <hr className={css(styles.dottedLine)} />
    <ul className={css(styles.groupBox)}>
      <li className={css(styles.groupItem)}>酒駕</li>
      <li className={css(styles.groupItem)}>洨賈斯丁</li>
      <li className={css(styles.groupItem)}>國民黨</li>
    </ul>
  </div>
);

const styles = StyleSheet.create({
  dottedLine: {
    border: '1px #727374 dashed'
  },
  leftArea: {
    marginRight: 60,
    marginTop: 15,
    width: 200
  },
  groupBox: {
    marginTop: 0,
    paddingLeft: 17
  },
  groupItem: {
    color: '#78797A',
    listStyleType: 'square'
  },
  groupTitle: {
    fontSize: 18
  }
});

TimeAndKeywordArea.propTypes = {
  newsList: PropTypes.any.isRequired
};

export default TimeAndKeywordArea;
