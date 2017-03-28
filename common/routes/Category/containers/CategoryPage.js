import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Layout } from '../../../style';
import { selectNewsList, loadCateogryList } from '../module';
import { loadMenus, selectMenus } from '../../../modules/menus';
import BlockItem from '../../../components/News/BlockItem';
import ClearFloat from '../../../components/ClearFloat';
import Header from '../../../components/Header';

const { container } = Layout;

const redial = {
  fetch: ({ dispatch, params: { categoryName } }) => Promise.all([
    dispatch(loadCateogryList(categoryName)),
    dispatch(loadMenus())
  ])
};

const mapStateToProps = state => ({
  newsList: selectNewsList(state),
  menus: selectMenus(state)
});

const CategoryPage = ({ newsList, menus }) => (
  <div className={css(styles.container)}>
    <Header menus={menus} />
    {newsList.isLoading &&
      <div>
        <h2 className={css(styles.title)}>Loading ...</h2>
      </div>}
    {!newsList.isLoading && newsList.data.length === 0 &&
      <div>查無相關新聞 ... </div>}

    {!newsList.isLoading && newsList.data.length > 0 &&
      newsList.data.map((news, i) => (
        <div key={news._id} className={css(styles.blockItem)}>
          <BlockItem key={news._id} news={news} />
        </div>
      ))}
    <ClearFloat />
  </div>
);

const styles = StyleSheet.create({
  container,
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  blockItem: {
    float: 'left',
    margin: 11.5,
    width: 300
  }
});

CategoryPage.propTypes = {
  menus: PropTypes.object.isRequired,
  newsList: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(CategoryPage));
