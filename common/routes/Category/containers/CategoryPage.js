import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Layout } from '../../../style';
import { selectCategoryPage, loadCateogryList } from '../module';
import { loadMenus, selectMenus } from '../../../modules/menus';
import Header from '../../../components/Header';
import { Slide } from '../../../components/News';
import { BlockItems, HotNews } from '../components';

const { container } = Layout;

const redial = {
  fetch: ({ dispatch, params: { categoryName } }) => Promise.all([
    dispatch(loadCateogryList(categoryName)),
    dispatch(loadMenus())
  ])
};

const mapStateToProps = state => ({
  categoryPage: selectCategoryPage(state),
  menus: selectMenus(state)
});

const CategoryPage = ({ categoryPage, menus }) => (
  <div className={css(styles.container)}>
    <Header menus={menus} />
    {categoryPage.isLoading &&
      <div>
        <h2 className={css(styles.title)}>Loading ...</h2>
      </div>}
    {!categoryPage.isLoading && categoryPage.data.length === 0 &&
      <div>查無相關新聞 ... </div>}

    {!categoryPage.isLoading && categoryPage.data.length > 0 &&
      <div>
        <Slide />
        <HotNews newsList={categoryPage.data} />
        <BlockItems newsList={categoryPage.data} />
      </div>
    }
  </div>
);

const styles = StyleSheet.create({
  container,
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }

});

CategoryPage.propTypes = {
  menus: PropTypes.object.isRequired,
  categoryPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(CategoryPage));
