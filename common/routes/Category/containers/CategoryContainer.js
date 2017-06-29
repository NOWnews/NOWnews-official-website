import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCategoryPage, loadCategoryList } from '../module';
import { selectLocal } from '../../../modules/sourceRequest';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { DFP, getAdType, OneAdIR, OneAdICIP } from '../../../components/Ad';
import { Header } from '../../../components/Header';
import { IsAdult } from '../../../components/Alert';
import { BlockItems12, Slide } from '../../../components/News';
import { HotNews } from '../components';
import { Container, Loading, Margin10, NotFound } from '../../../components/Layout';
import { MicroDataCategory } from '../../../components/JSONLD';
import Helmet from 'react-helmet';

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
      <div>
        <Helmet title='NOWnews 今日新聞' titleTemplate={currentMenu.name + '| NOWnews 今日新聞'}
          meta={[
            { name: 'description', content: `${currentMenu.name}相關新聞及資料都在NOWnews今日新聞。` },
            { name: 'keywords', content: currentMenu.name },
            { name: 'news_keywords', content: currentMenu.name },
            { name: 'twitter:title', content: `${currentMenu.name}相關新聞及資料都在NOWnews今日新聞。` },
            { name: 'twitter:image', content: 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg' },
            { name: 'twitter:description', content: `${currentMenu.name}相關新聞及資料都在NOWnews今日新聞。` },
            { name: 'twitter:card', content: 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg' },
            { name: 'contact', content: 'service@nownews.com' },
            { property: 'og:site_name', name: 'application-name', content: 'NOWnews 今日新聞' },
            { property: 'article:author', content: 'https://www.facebook.com/nownews' },
            { property: 'og:type', content: 'article' },
            { property: 'og:locale', content: 'zh_TW' },
            { property: 'og:title', content: currentMenu.name },
            { property: 'og:description', content: `${currentMenu.name}相關新聞及資料都在NOWnews今日新聞。` },
            { property: 'og:image', content: 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg' },
            { property: 'og:url', content: 'https://www.nownews.com' + currentMenu.url },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
          link={[
              {rel: 'canonical', href: `https://www.nownews.com${currentMenu.url}`}
          ]} />
      </div>
      <OneAdICIP />
      <MicroDataCategory category={categoryPage} />
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
      <OneAdIR />
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
