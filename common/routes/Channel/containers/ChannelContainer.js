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
      {isLoading && <Loading />}
      <ChannelSelecter channels={channels} selectedChannel={channel} loadChannelData={loadChannelData} />
      {!isLoading && newsList.length === 0 && <NotFound />}
      {!isLoading && newsList.length > 0 &&
        <Margin10>
          <BlockItems newsList={newsList} />
          <Pagination {...pageData} {...local} />
        </Margin10>
      }
    </Container>
  );
};

ChannelContainer.propTypes = {
  channelPage: PropTypes.object.isRequired,
  local: PropTypes.object.isRequired,
  loadChannelData: PropTypes.func.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(ChannelContainer));
