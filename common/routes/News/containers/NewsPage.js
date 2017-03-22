import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite/no-important';
import { loadNews, selectCurrentNews } from '../../../modules/news';
import {
  Head, FontSize, NewsContent, Social, Thermometer,
  ThermometerSm, ReleatedContent
} from '../components';

import { Ad300x250 } from '../../../components/Ad';

const redial = {
  fetch: ({ dispatch, params: { id } }) => dispatch(loadNews(`news/${id}`))
};

const mapStateToProps = state => selectCurrentNews(state);

const NewsPage = ({data, isLoading}) => {
  let { newsBy, MainMenu, title, ...news } = data;
  return (
    <div>
      {isLoading &&
        <div>
          <h2 className={css(styles.loading)}>Loading....</h2>
        </div>}
      {!isLoading &&
        <div>
          <Head newsBy={newsBy} mainMenu={MainMenu} title={title} />
          <div className={css(styles.box)}>
            <img className={css(styles.img)} src={news.MainPhoto && news.MainPhoto.url || 'https://legacy.nownews.com/NOWnews_default/default_terry.jpg'} />
            <span>{news.MainPhoto && news.MainPhoto.desc}</span>
            <div className={css(styles.content)}>
              <div className={css(styles.leftSide)}>
                <NewsContent content={news.content} />
                <Social />
                <ThermometerSm />
                <ReleatedContent type='相關新聞' />
                <ReleatedContent type='你可能會喜歡' />
              </div>
              <div className={css(styles.rightSide)}>
                <Social />
                <FontSize />
                <Ad300x250 />
                <Thermometer />
                <Ad300x250 />
                <Ad300x250 />
              </div>
            </div>
          </div>
        </div>}
    </div>
  );
};

NewsPage.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const styles = StyleSheet.create({
  box: {
    width: 900,
    margin: '0 auto'
  },
  content: {
    display: 'inline-flex',
    margin: '1rem 0'
  },
  img: {
    height: '100%',
    width: '100%'
  },
  leftSide: {
    width: '69%'
  },
  rightSide: {
    width: '31%'
  },
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

export default provideHooks(redial)(connect(mapStateToProps)(NewsPage));
