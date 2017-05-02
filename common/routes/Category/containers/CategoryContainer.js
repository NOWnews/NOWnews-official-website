import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCategoryPage, loadCategoryList } from '../module';
import { loadHeader, selectMenus } from '../../../modules/header';
import { Header } from '../../../components/Header';
import { BlockItems12, Slide } from '../../../components/News';
import { HotNews } from '../components';
import { Container, Loading, Margin10, NotFound } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch, params: { categoryName }, query: { page } }) => Promise.all([
    dispatch(loadCategoryList(categoryName, page)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  categoryPage: selectCategoryPage(state),
  menus: selectMenus(state)
});

const CategoryPage = ({ categoryPage, menus }) => {
  let originList = categoryPage.newsList || [];
  let slideData = originList.slice(0, 5);
  let blockData = originList.slice(5, 10);
  return (
    <Container>
      <Header menus={menus} currentMainMenu={originList[0] && originList[0].MainMenu.id} />
      {categoryPage.isLoading && <Loading />}
      {!categoryPage.isLoading && originList.length === 0 && <NotFound />}
      {!categoryPage.isLoading && originList.length > 0 &&
        <div>
          <Margin10 className='clearfix'>
            <Slide list={slideData} />
            <HotNews newsList={categoryPage.hotNewsList.slice(0, 6)} />
          </Margin10>
          <BlockItems12 newsList={blockData} page={categoryPage.pageData} />
        </div>
      }
    </Container>
  );
};

CategoryPage.propTypes = {
  categoryPage: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(CategoryPage));
