import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';

export const Pagination = ({ path: pathname, query, ...pageData }) => {
  const pages = [];
  const { currentPage = 1, hasPrev = false, hasNext = false, nextPage = 0, prevPage = 0, totalPage = 1 } = pageData;
  // 當在倒數幾頁的時候就不能使用最大值 10 筆，要依據 totalPage 除 10 的餘數
  const totalDeciles = Math.floor(totalPage / 10);
  const currentDeciles = Math.floor(currentPage / 10);

  let index = 1;
  let max = 10;

  if (totalDeciles === currentDeciles) {
    max = totalPage % 10;
  }

  for (index; index <= max; index++) {
    const page = (10 * currentDeciles) + index;
    if (currentPage === page) {
      pages.push(<Link key={page} className={css(styles.page, styles.activePage)} to={{pathname, query}}>{page}</Link>);
    } else {
      pages.push(<Link key={page} className={css(styles.page)} to={{pathname, query: {...query, page}}}>{page}</Link>);
    }
  }

  return (
    <div className={css(styles.box)}>
      { hasPrev
        ? <Link className={css(styles.prevAndNext)} to={{pathname, query: {...query, page: prevPage}}}>上一頁</Link>
        : <Link className={css(styles.prevAndNext, styles.disabledPrevAndNext)}>上一頁</Link>}
      { pages }
      { hasNext
        ? <Link className={css(styles.prevAndNext)} to={{pathname, query: {...query, page: nextPage}}}>下一頁</Link>
        : <Link className={css(styles.prevAndNext, styles.disabledPrevAndNext)}>下一頁</Link>}
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
    borderRadius: 15,
    fontSize: 13,
    padding: '2px 6px',
    textDecoration: 'none'
  }
});

Pagination.propTypes = {
  path: PropTypes.string,
  query: PropTypes.object,
  currentPage: PropTypes.number,
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
  nextPage: PropTypes.number,
  prevPage: PropTypes.number,
  totalPage: PropTypes.number
};

export default Pagination;
