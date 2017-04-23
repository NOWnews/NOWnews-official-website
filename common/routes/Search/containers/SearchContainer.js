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
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadSearchList()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  searchPage: selectSearchPage(state),
  menus: selectMenus(state)
});

const SearchPage = ({ menus, searchPage }) => (
  <Container>
    <Header menus={menus} />
    <Margin10 className='center'>
      <input type='text' placeholder='搜尋'
        className={`input ${css(styles.searchInput)}`} />
      <FontAwesome name='search' style={{fontSize: 20}}
        className={css(styles.searchIcon)} />
    </Margin10>
    <Margin10 className='clearfix'>
      <TimeAndKeywordArea />
      <div className='left'>
        {searchPage.isLoading &&
          <div>
            <h2>Loading ...</h2>
          </div>}
        {!searchPage.isLoading && searchPage.list.length === 0 &&
          <div>查無相關新聞 ... </div>}
        {!searchPage.isLoading && searchPage.list.length > 0 &&
          <div>
            {searchPage.list.map((value, i) => (
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
    <Pagination {...searchPage.pageData} />
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
  searchIcon: {
    position: 'relative',
    cursor: 'pointer',
    right: 30
  }
});

SearchPage.propTypes = {
  menus: PropTypes.array.isRequired,
  searchPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(SearchPage));
