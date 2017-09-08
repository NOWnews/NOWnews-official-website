import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCategoryPage, loadCategoryList } from '../module';
import { selectLocal } from '../../../modules/sourceRequest';
import { loadHeader, selectMarquee, selectMenus, selectObjectMenu } from '../../../modules/header';
import { DFP, getAdType, OneAdICIP } from '../../../components/Ad';
import { Header } from '../../../components/Header';
import { IsAdult } from '../../../components/Alert';
import { BlockItems12, Slide } from '../../../components/News';
import { HotNews, ChannelTemplate } from '../components';
import { Container, Loading, Margin10, NotFound } from '../../../components/Layout';
import { MicroDataCategory } from '../../../components/JSONLD';
import Helmet from 'react-helmet';

const redial = {
  fetch: ({ dispatch, params: { categoryName }, query: { page } }) => Promise.all([
    dispatch(loadCategoryList(categoryName, page)),
    dispatch(loadHeader())
  ])
};

const mapDispatchToProps = bindActionCreators.bind(null, {
  loadCategoryList
});

const mapStateToProps = state => ({
  local: selectLocal(state),
  categoryPage: selectCategoryPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state),
  objectMenu: selectObjectMenu(state)
});

const CategoryPage = ({ categoryPage, local, menus, marquee, objectMenu, loadCategoryList }) => {
  const { currentMenu, hotNewsList, newsList, pageData, columnSpecialChannel } = categoryPage;
  const isDefaultTemplate = currentMenu.template === 'DEFAULT';
  const isChannelTemplate = currentMenu.template === 'SPECIALCHANNEL';
  const slideData = isDefaultTemplate ? newsList.slice(0, 5) : hotNewsList.slice(0, 5);
  const hotBlockData = isDefaultTemplate ? hotNewsList.slice(0, 6) : hotNewsList.slice(5, 11);
  const blockData = isDefaultTemplate ? newsList.slice(5, 15) : newsList.slice(0, 10);

  const isMainMenu = currentMenu.ParentId === null;
  const currentMainMenu = isMainMenu ? currentMenu : objectMenu[currentMenu.ParentId];
  const currentChildMenu = isMainMenu ? null : currentMenu;

  const adCode = (isDefaultTemplate) ? getAdType.fromCurrentOne(currentMainMenu, currentChildMenu) : currentMenu.templateAD;
  const topAd = (isDefaultTemplate) ? `/5799246/Nownews_${adCode}_970x250_T_new2` : `/5799246/column_970x90_pu_${adCode}`;
  const footerAd = (isDefaultTemplate) ? `/5799246/Nownews_${adCode}_970x250_B_new2` : `/5799246/column_970x90_pd_${adCode}`;
  return (
    <Container>
      {currentMenu.name && <div>
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
        <MicroDataCategory category={categoryPage} />
        <IsAdult isAdult={currentMenu.isAdult} />
      </div>}
      <Header ad={topAd} menus={menus} marquee={marquee}
        currentChildMenu={currentChildMenu && currentChildMenu._id}
        currentMainMenu={currentMainMenu && currentMainMenu._id} />
      {isDefaultTemplate && <OneAdICIP />}
      {categoryPage.isLoading && <Loading />}
      {!categoryPage.isLoading && newsList.length === 0 && <NotFound />}
      {!categoryPage.isLoading && newsList.length > 0 && !isChannelTemplate &&
        <div>
          <Margin10 className='clearfix'>
            <Slide list={slideData} />
            <HotNews newsList={hotBlockData} />
          </Margin10>
          <BlockItems12 isDefaultTemplate={isDefaultTemplate} adCode={adCode} newsList={blockData} page={pageData} local={local} />
        </div>
      }
      {!categoryPage.isLoading && newsList.length > 0 && isChannelTemplate &&
        <ChannelTemplate newsList={newsList} page={pageData} local={local}
          loadData={loadCategoryList} selected={currentMenu} options={columnSpecialChannel.SubMenus} />
      }
      <DFP opts={[footerAd, [[970, 250], [970, 90]]]} />
    </Container>
  );
};

CategoryPage.propTypes = {
  loadCategoryList: PropTypes.func.isRequired,
  local: PropTypes.object.isRequired,
  categoryPage: PropTypes.object.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  objectMenu: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(CategoryPage));
