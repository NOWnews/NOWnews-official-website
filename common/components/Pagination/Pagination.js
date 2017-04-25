import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

export const Pagination = ({ currentPage = 1, hasPrev = false, hasNext = false, nextPage = 0, prevPage = 0, totalPage = 1 }) => {
  let index = 1;
  let max = 10;
  let pages = [];

  // 當在倒數幾頁的時候就不能使用最大值 10 筆，要依據 totalPage 除 10 的餘數
  let totalDeciles = Math.floor(totalPage / 10);
  let currentDeciles = Math.floor(currentPage / 10);
  if (totalDeciles === currentDeciles) {
    max = totalPage % 10;
  }

  for (index; index <= max; index++) {
    let page = (10 * currentDeciles) + index;
    let url = `?page=${page}`;

    if (currentPage === index) {
      pages.push(<a key={page} className={css(styles.page, styles.activePage)} href={url}>{page}</a>);
    } else {
      pages.push(<a key={page} className={css(styles.page)} href={url}>{page}</a>);
    }
  }

  return (
    <div className={css(styles.box)}>
      { hasPrev
        ? <a className={css(styles.prevAndNext)} href={`?page=${prevPage}`}>上一頁</a>
        : <a className={css(styles.prevAndNext, styles.disabledPrevAndNext)}>上一頁</a>}
      { pages }
      { hasNext
        ? <a className={css(styles.prevAndNext)} href={`?page=${nextPage}`}>下一頁</a>
        : <a className={css(styles.prevAndNext, styles.disabledPrevAndNext)}>下一頁</a>}
    </div>
  );
};

const styles = StyleSheet.create({
  activePage: {
    color: '#1886FB'
  },
  box: {
    marginBottom: 50,
    textAlign: 'center'
  },
  disabledPrevAndNext: {
    borderColor: '#D0D1D2',
    color: '#D0D1D2'
  },
  page: {
    color: '#000000',
    padding: '5px 8px',
    textDecoration: 'none'
  },
  prevAndNext: {
    color: '#000000',
    border: '1px solid #000000',
    borderRadius: '30%',
    fontSize: 13,
    padding: '2px 6px',
    textDecoration: 'none'
  }
});

Pagination.propTypes = {
  currentPage: PropTypes.number,
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
  nextPage: PropTypes.number,
  prevPage: PropTypes.number,
  totalPage: PropTypes.number
};

export default Pagination;
