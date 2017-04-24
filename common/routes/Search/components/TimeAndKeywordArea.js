import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

const TimeAndKeywordArea = ({ hotKeywords = [], keyword, timeRange }) => {
  let definedTimeOptions = [
    { value: 'lastWeek', text: '過去一週' },
    { value: 'lastMonth', text: '過去一個月' },
    { value: 'lastYear', text: '過去一年' }
  ];
  let timeOptions = definedTimeOptions.map(({ value, text }) => {
    let className = (value === timeRange) ? css(styles.activeLink) : '';
    return (
      <li key={value} className={css(styles.groupItem)}>
        <Link className={`${className} ${css(styles.groupItemLink)}`}
          to={`search?timeRange=${value}&keyword=${keyword}`}>
          <i className={css(styles.sequare)}>■</i> {text}
        </Link>
      </li>
    );
  });
  return (
    <div className={`left ${css(styles.leftArea)}`}>
      <label className={css(styles.groupTitle)}>時間搜尋</label>
      <hr className={css(styles.dottedLine)} />
      <ul className={css(styles.groupBox)}>
        { timeOptions }
      </ul>
      <br />
      <label className={css(styles.groupTitle)}>熱門搜尋</label>
      <hr className={css(styles.dottedLine)} />
      <ul className={css(styles.groupBox)}>
        {hotKeywords.map((text, key) =>
          <li key={key} className={css(styles.groupItem)}>
            <Link className={css(styles.groupItemLink)}
              to={`search?timeRange=${timeRange}&keyword=${text}`}>
              <i className={css(styles.sequare)}>■</i> {text}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

const styles = StyleSheet.create({
  activeLink: {
    color: '#1884FB'
  },
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
    paddingLeft: 0
  },
  groupItem: {
    color: '#78797A',
    cursor: 'pointer',
    listStyleType: 'none'
  },
  groupTitle: {
    fontSize: 18
  },
  groupItemLink: {
    color: '#78797A',
    textDecoration: 'none'
  },
  sequare: {
    fontSize: 18
  }
});

TimeAndKeywordArea.propTypes = {
  hotKeywords: PropTypes.array,
  keyword: PropTypes.string,
  timeRange: PropTypes.string
};

export default TimeAndKeywordArea;
