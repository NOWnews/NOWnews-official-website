import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectChannelPage, loadChannelData } from '../module';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLocal } from '../../../modules/sourceRequest';
import { Header } from '../../../components/Header';
import Pagination from '../../../components/Pagination';
import { ChannelSelecter, BlockItems } from '../components';
import { Container, Loading, Margin10, NotFound } from '../../../components/Layout';
import { DFP, OneAdICIP } from '../../../components/Ad';
import Helmet from 'react-helmet';

const redial = {
  fetch: ({ dispatch, params: { sn }, query: { page } }) => Promise.all([
    dispatch(loadChannelData(sn, page)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  local: selectLocal(state),
  channelPage: selectChannelPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  loadChannelData
});

const ChannelContainer = ({ channelPage, local, loadChannelData, menus, marquee }) => {
  const { channels, isLoading, pageData, selectedChannel } = channelPage;
  const { newsList = [], ...channel } = selectedChannel;
  return (
    <Container>
      <Header menus={menus} marquee={marquee} />
      <OneAdICIP />
      {isLoading && <Loading />}
      <ChannelSelecter channels={channels} selectedChannel={channel} loadChannelData={loadChannelData} />
      {!isLoading && newsList.length === 0 && <NotFound />}
      {!isLoading && newsList.length > 0 &&
        <Margin10>
          <Helmet title='NOWnews 今日新聞' titleTemplate={selectedChannel.title + '| NOWnews 今日新聞'}
            meta={[
              { name: 'description', content: `${selectedChannel.title} | 特輯` },
              { name: 'twitter:title', content: `${selectedChannel.title} | 特輯` },
              { name: 'twitter:image', content: newsList[0].MainPhoto.large },
              { name: 'twitter:description', content: `${selectedChannel.title} | 特輯 | NOWnews 今日新聞` },
              { name: 'twitter:card', content: newsList[0].MainPhoto.large },
              { name: 'contact', content: 'service@nownews.com' },
              { property: 'og:site_name', name: 'application-name', content: 'NOWnews 今日新聞' },
              { property: 'article:author', content: 'https://www.facebook.com/nownews' },
              { property: 'og:type', content: 'article' },
              { property: 'og:locale', content: 'zh_TW' },
              { property: 'og:title', content: `${selectedChannel.title} | 特輯` },
              { property: 'og:description', content: `${selectedChannel.title} | 特輯 | NOWnews 今日新聞` },
              { property: 'og:image', content: newsList[0].MainPhoto.originSource },
              { property: 'og:url', content: 'https://www.nownews.com/channel/' + selectedChannel.sn },
              { property: 'og:rich_attachment', content: 'true' }
            ]}
            link={[
              {rel: 'canonical', href: `https://www.nownews.com/channel/${selectedChannel.sn}`}
            ]} />
          <BlockItems newsList={newsList} />
          <Pagination {...pageData} {...local} />
        </Margin10>
      }
      <DFP opts={['/5799246/Nownews_home_970x250_B_new2', [[970, 250], [970, 90]], 'div-gpt-ad-1496983308222-0']} />
    </Container>
  );
};

ChannelContainer.propTypes = {
  channelPage: PropTypes.object.isRequired,
  local: PropTypes.object.isRequired,
  loadChannelData: PropTypes.func.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(ChannelContainer));
