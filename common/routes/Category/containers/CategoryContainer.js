import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCategoryPage, loadCategoryList } from '../module';
import { selectLocal } from '../../../modules/sourceRequest';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { DFP, getAdType } from '../../../components/Ad';
import { Header } from '../../../components/Header';
import { IsAdult } from '../../../components/Alert';
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
  local: selectLocal(state),
  categoryPage: selectCategoryPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const CategoryPage = ({ categoryPage, local, menus, marquee }) => {
  const { currentMenu, hotNewsList, newsList, pageData } = categoryPage;
  const adType = getAdType(currentMenu);
  const slideData = newsList.slice(0, 5);
  const blockData = newsList.slice(5, 15);

  const isMainMenu = currentMenu.ParentId === null;
  const currentMainMenu = isMainMenu ? currentMenu._id : currentMenu.ParentId;
  const currentChildMenu = isMainMenu ? null : currentMenu._id;
  return (
    <Container>
      <IsAdult isAdult={currentMenu.isAdult} />
      <Header adType={adType} menus={menus} marquee={marquee}
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
          <BlockItems12 adType={adType} newsList={blockData} page={pageData} local={local} />
        </div>
      }
      <DFP opts={[`/5799246/Nownews_${adType}_970x250_B_new2`, [[970, 250], [970, 90]]]} />
    </Container>
  );
};

CategoryPage.propTypes = {
  local: PropTypes.object.isRequired,
  categoryPage: PropTypes.object.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(CategoryPage));
