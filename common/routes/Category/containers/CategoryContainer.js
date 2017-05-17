import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCategoryPage, loadCategoryList } from '../module';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
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
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const CategoryPage = ({ categoryPage, menus, marquee }) => {
  const { currentMenu, hotNewsList, newsList, pageData } = categoryPage;
  const slideData = newsList.slice(0, 5);
  const blockData = newsList.slice(5, 15);

  const isMainMenu = currentMenu.ParentId === null;
  const currentMainMenu = isMainMenu ? currentMenu._id : currentMenu.ParentId;
  const currentChildMenu = isMainMenu ? null : currentMenu._id;

  return (
    <Container>
      <Header menus={menus} marquee={marquee}
        currentChildMenu={currentChildMenu}
        currentMainMenu={currentMainMenu} />
      {categoryPage.isLoading && <Loading />}
      {!categoryPage.isLoading && newsList.length === 0 && <NotFound />}
      {!categoryPage.isLoading && newsList.length > 0 &&
        <div>
          <Margin10 className='clearfix'>
            <Slide list={slideData} />
            <HotNews newsList={hotNewsList.slice(0, 6)} />
          </Margin10>
          <BlockItems12 newsList={blockData} page={pageData} />
        </div>
      }
    </Container>
  );
};

CategoryPage.propTypes = {
  categoryPage: PropTypes.object.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(CategoryPage));
