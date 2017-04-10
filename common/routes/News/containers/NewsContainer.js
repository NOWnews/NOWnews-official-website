import moment from 'moment';
import { provideHooks } from 'redial';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import InfiniteScroll from 'react-infinite-scroller';
import Header from '../../../components/Header';
import { Ad970x250 } from '../../../components/Ad';
import { Container } from '../../../components/Layout';
import { Head, NewsContent } from '../../../components/News';

import { loadNews, selectCurrentNews } from '../module';
import { loadMenus, selectMenus } from '../../../modules/menus';

const redial = {
  fetch: ({ dispatch, params: { sn } }) => Promise.all([
    dispatch(loadMenus()),
    dispatch(loadNews(sn))
  ])
};

const mapStateToProps = state => ({
  currentNews: selectCurrentNews(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  loadNews
});

class NewsPage extends Component {
  constructor (props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.touchWindowTop = this.touchWindowTop.bind(this);
  }

  loadItems () {
    let newsData = this.props.currentNews.data;
    let sn = newsData[newsData.length - 1].next.sn;
    let isLoadMore = true;
    this.props.loadNews(sn, isLoadMore);
  }

  touchWindowTop (item, index) {
    let { sn, startedAt } = this.props.currentNews.data[index];
    let formatStartedAt = moment(startedAt).format('YYYYMMDD');
    window.history.pushState(null, null, `/news/${formatStartedAt}/${sn}`);
  }

  render () {
    let { isLoading, data, hasMore } = this.props.currentNews;
    let items = [];
    let totalLength = data.length;
    data.map((item, i) => {
      let { formatStartedAt, newsBy, MainMenu, title, ...news } = item;
      items.push(
        <div key={news.sn}>
          <Head newsBy={newsBy} mainMenu={MainMenu} time={formatStartedAt} title={title} />
          <NewsContent news={news} />
          {(totalLength - 1) !== i && <Container><Ad970x250 /></Container>}
        </div>
      );
    });

    return (
      <div>
        <Header menus={this.props.menus} />
        {isLoading &&
          <div>
            <div>{items}</div>
            <h2 className={css(styles.loading)}>Loading....</h2>
          </div>}
        {!isLoading &&
          <InfiniteScroll
            pageStart={0}
            loader={<div>Load More ...</div>}
            loadMore={this.loadItems}
            hasMore={hasMore}
            touchWindowTop={this.touchWindowTop}>
            <div>{items}</div>
          </InfiniteScroll>}
      </div>
    );
  }
}

NewsPage.propTypes = {
  currentNews: PropTypes.object.isRequired,
  loadNews: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#000'
  },
  loading: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  }
});

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(NewsPage));
