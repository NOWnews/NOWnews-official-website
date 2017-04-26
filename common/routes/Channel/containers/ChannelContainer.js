import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectChannelPage, loadChannelData } from '../module';
import { loadHeader, selectMenus } from '../../../modules/header';
import Header from '../../../components/Header';
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
  channelPage: selectChannelPage(state),
  menus: selectMenus(state)
});

const ChannelPage = ({ channelPage, menus }) => {
  let { channels, isLoading, pageData, selectedChannel } = channelPage;
  let { newsList = [], ...channel } = selectedChannel;
  return (
    <Container>
      <Header menus={menus} />
      {isLoading && <Loading />}
      <ChannelSelecter channels={channels} selectedChannel={channel} />
      {!isLoading && newsList.length === 0 && <NotFound />}
      {!isLoading && newsList.length > 0 &&
        <Margin10 className='clearfix'>
          <BlockItems newsList={newsList} />
          <Pagination {...pageData} />
        </Margin10>
      }

    </Container>
  );
};

ChannelPage.propTypes = {
  channelPage: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(ChannelPage));
