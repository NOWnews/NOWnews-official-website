import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

class TimeAndKeywordArea extends Component {

  constructor (props) {
    super(props);
    this.setKeyword = this.setKeyword.bind(this);
    this.setTimeRange = this.setTimeRange.bind(this);
  }

  setTimeRange (timeRange) {
    let { keyword } = this.props;
    window.history.pushState(null, null, `/search?keyword=${keyword}&timeRange=${timeRange}`);
    this.props.loadSearchList({ keyword, timeRange });
  }

  setKeyword (keyword) {
    window.history.pushState(null, null, `/search?keyword=${keyword}`);
    this.props.loadSearchList({ keyword, timeRange: '' });
  }

  render () {
    const definedTimeOptions = [
      { value: 'lastWeek', text: '過去一週' },
      { value: 'lastMonth', text: '過去一個月' },
      { value: 'lastYear', text: '過去一年' }
    ];
    // tempData
    const { hotKeywords = ['不要不要', '藍軍教父', '谷阿莫'], timeRange } = this.props;

    const timeOptions = definedTimeOptions.map(({ value, text }) => {
      const className = css(
        styles.groupItem,
        (value === timeRange) ? styles.active : ''
      );
      return (
        <li key={value} className={className}
          onClick={() => { this.setTimeRange(value); }}>
          <i className={css(styles.sequare)}>■</i>
          {text}
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
          {hotKeywords.map((word, key) =>
            <li key={key} className={css(styles.groupItem)}
              onClick={() => { this.setKeyword(word); }}>
              <i className={css(styles.sequare)}>■ </i>
              {word}
            </li>
        )}
        </ul>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  active: {
    color: '#0080FF'
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
    listStyleType: 'none',
    ':hover': {
      opacity: 0.6
    }
  },
  groupTitle: {
    fontSize: 18
  },
  sequare: {
    fontSize: 18
  }
});

TimeAndKeywordArea.propTypes = {
  hotKeywords: PropTypes.array,
  keyword: PropTypes.string,
  loadSearchList: PropTypes.func.isRequired,
  timeRange: PropTypes.string
};

export default TimeAndKeywordArea;
