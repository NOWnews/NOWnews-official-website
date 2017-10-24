import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

class KeywordArea extends PureComponent {

  render () {
    const { hotKeywords, keyword } = this.props;

    const keywordDoms = hotKeywords.map((word, key) => {
      const className = css(
        styles.groupItem,
        (word === keyword) ? styles.active : ''
      );
      return (
        <li key={key} className={className}>
          <a href={`/search?keyword=${word}`} className={className}>
            <i className={css(styles.sequare)}>■ </i>
            {word}
          </a>
        </li>
      );
    });

    return (
      <div className={`left ${css(styles.leftArea)}`}>
        <label className={css(styles.groupTitle)}>熱門搜尋</label>
        <hr className={css(styles.dottedLine)} />
        <ul className={css(styles.groupBox)}>
          { keywordDoms }
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
    marginRight: 40,
    marginTop: 25,
    width: 175
  },
  groupBox: {
    marginTop: 0,
    paddingLeft: 0
  },
  groupItem: {
    textDecoration: 'none',
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

KeywordArea.propTypes = {
  hotKeywords: PropTypes.array,
  keyword: PropTypes.string
};

export default KeywordArea;
