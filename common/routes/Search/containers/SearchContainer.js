import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import moment from 'moment';
import { selectSearchPage, loadSearchList } from '../module';

import { loadHeader, selectMenus } from '../../../modules/header';

import Header from '../../../components/Header';
import ListItem from '../../../components/News/ListItem';
import { Container, Margin10 } from '../../../components/Layout';
import Pagination from '../../../components/Pagination';

import { TimeAndKeywordArea } from '../components';

const redial = {
  fetch: ({ dispatch, query }) => Promise.all([
    dispatch(loadSearchList(query)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  searchPage: selectSearchPage(state),
  menus: selectMenus(state)
});

const SearchPage = ({menus, searchPage: { isLoading, list, hotKeywords, pageData, keyword, timeRange }}) => (
  <Container>
    <Header menus={menus} />
    <form method='get'>
      <Margin10 className='center'>
        <input type='text' name='keyword' placeholder='搜尋'
          className={`input ${css(styles.searchInput)}`} defaultValue={keyword} />
        <button type='submit' className={css(styles.submitButton)}>
          <FontAwesome name='search' style={{fontSize: 20}}
            className={css(styles.searchIcon)} />
        </button>
      </Margin10>
      <Margin10 className='clearfix'>
        <TimeAndKeywordArea hotKeywords={hotKeywords} keyword={keyword} timeRange={timeRange} />
        <div className='left'>
          {isLoading &&
            <div>
              <h2>Loading ...</h2>
            </div>}
          {!isLoading && list.length === 0 &&
            <div>查無相關新聞 ... </div>}
          {!isLoading && list.length > 0 &&
            <div>
              {list.map((value, i) => (
                <ListItem
                  key={value.sn}
                  category={value.MainMenu && value.MainMenu.name || 'Sponsored'}
                  photo={value.MainPhoto}
                  title={value.title}
                  time={moment(value.formatStartedAt).format('YYYY/MM/DD')}
                  url={`/news/${moment(value.formatStartedAt).format('YYYYMMDD')}/${value.sn}`} />
              ))}
            </div>
          }
        </div>
      </Margin10>
    </form>
    <Pagination {...pageData} />
  </Container>
);

const styles = StyleSheet.create({
  searchInput: {
    background: '#E4E5E6',
    border: 0,
    borderRadius: 10,
    fontSize: 20,
    height: 40,
    outline: 'none',
    paddingLeft: 20,
    width: '60%'
  },
  submitButton: {
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    right: 40,
    position: 'relative'
  }
});

SearchPage.propTypes = {
  menus: PropTypes.array.isRequired,
  searchPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(SearchPage));
