import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { selectCategoryPage, loadCateogryList } from '../module';
import { loadMenus, selectMenus } from '../../../modules/menus';
import Header from '../../../components/Header';
import Pagination from '../../../components/Pagination';
import { Slide } from '../../../components/News';
import { BlockItems, HotNews } from '../components';
import { ClearFix, Container } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch, params: { categoryName }, query: { page } }) => Promise.all([
    dispatch(loadCateogryList(categoryName, page)),
    dispatch(loadMenus())
  ])
};

const mapStateToProps = state => ({
  categoryPage: selectCategoryPage(state),
  menus: selectMenus(state)
});

const CategoryPage = ({ categoryPage, menus }) => {
  let originList = categoryPage.newsList;
  let slideData = originList.slice(0, 5);
  let blockData = originList.slice(5, 10);
  return (
    <Container>
      <Header menus={menus} />
      {categoryPage.isLoading &&
        <div>
          <h2>Loading ...</h2>
        </div>}
      {!categoryPage.isLoading && originList.length === 0 &&
        <div>查無相關新聞 ... </div>}

      {!categoryPage.isLoading && originList.length > 0 &&
        <div>
          <div className={css(styles.slideAndHot)}>
            <Slide newsList={slideData} />
            <HotNews newsList={categoryPage.hotNewsList} />
            <ClearFix />
          </div>
          <BlockItems newsList={blockData} />
          <Pagination {...categoryPage.pageData} />
        </div>

      }
    </Container>
  );
};

const styles = StyleSheet.create({
  slideAndHot: {
    margin: '10px 0'
  }
});

CategoryPage.propTypes = {
  categoryPage: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(CategoryPage));
