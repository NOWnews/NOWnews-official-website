import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import FontAwesome from 'react-fontawesome';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLocal } from '../../../modules/sourceRequest';
import { selectHotKeywords, loadHotKeywords } from '../module';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Header } from '../../../components/Header';
import Helmet from 'react-helmet';
import { OneAdICIP } from '../../../components/Ad';
import { Container, Margin10 } from '../../../components/Layout';
import { KeywordArea } from '../components';

const redial = {
  fetch: ({ dispatch, query }) => Promise.all([
    dispatch(loadHeader()),
    dispatch(loadHotKeywords())
  ])
};

const mapStateToProps = state => ({
  local: selectLocal(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state),
  hotKeywords: selectHotKeywords(state)
});

class SearchPage extends PureComponent {
  render () {
    const { hotKeywords, menus, local, marquee } = this.props;
    const { keyword = '' } = local.query;
    const cx = '011307215138928456114:avv2qvejmpc';
    const googleSearchScript = `https://cse.google.com/cse.js?cx=${cx}`;
    const googleSearchDom = '<gcse:searchresults-only></gcse:searchresults-only>';
    const defaultPhoto = 'https://legacy.nownews.com/NOWnews_default/default.png';
    return (
      <Container>
        <Helmet title='NOWnews 今日新聞' titleTemplate={keyword + '熱門搜尋| 新聞搜尋 | NOWnews 今日新聞'}
          meta={[
            { name: 'description', content: `${keyword}相關新聞及資料都在NOWnews今日新聞。` },
            { name: 'keywords', content: `${keyword}, ${hotKeywords.join(',')}` },
            { name: 'news_keywords', content: `${keyword}, ${hotKeywords.join(',')}` },
            { name: 'twitter:title', content: `${keyword} 熱門搜尋| 新聞搜尋 | NOWnews 今日新聞` },
            { name: 'twitter:image', content: defaultPhoto },
            { name: 'twitter:description', content: `${keyword}相關新聞及資料都在NOWnews今日新聞。` },
            { name: 'twitter:card', content: defaultPhoto },
            { name: 'contact', content: 'service@nownews.com' },
            { property: 'og:site_name', name: 'application-name', content: 'NOWnews 今日新聞' },
            { property: 'article:author', content: 'https://www.facebook.com/nownews' },
            { property: 'og:type', content: 'article' },
            { property: 'og:locale', content: 'zh_TW' },
            { property: 'og:title', content: `${keyword} 熱門搜尋| 新聞搜尋 | NOWnews 今日新聞` },
            { property: 'og:description', content: `${keyword}相關新聞及資料都在NOWnews今日新聞。` },
            { property: 'og:image', content: defaultPhoto },
            { property: 'og:url', content: `https://www.nownews.com/search?keyword=${keyword}` },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
          script={[
              {async: 'async', src: googleSearchScript}
          ]} />
        <Header menus={menus} marquee={marquee} />
        <OneAdICIP />
        <Margin10 className='center'>
          <form action='/search' method='get'>
            <input type='text' name='keyword' placeholder='搜尋'
              className={`input ${css(styles.searchInput)}`} defaultValue={keyword} />
            <button type='submit' className={css(styles.submitButton)}>
              <FontAwesome name='search' style={{fontSize: 20}}
                className={css(styles.searchIcon)} />
            </button>
          </form>
        </Margin10>
        <Margin10 className='clearfix'>
          <KeywordArea hotKeywords={hotKeywords} keyword={keyword} />
          <div className={css(styles.searchContent)}
            dangerouslySetInnerHTML={{__html: googleSearchDom}} />
        </Margin10>

      </Container>
    );
  }
};

const styles = StyleSheet.create({
  searchInput: {
    background: '#E4E5E6',
    border: 0,
    borderRadius: 10,
    fontSize: 20,
    height: 40,
    outline: 'none',
    paddingLeft: 20,
    width: '60%'
  },
  submitButton: {
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    outline: 'none',
    right: 40,
    position: 'relative'
  },
  searchContent: {
    float: 'left',
    width: 700
  }
});

SearchPage.propTypes = {
  local: PropTypes.object.isRequired,
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  hotKeywords: PropTypes.array
};

export default provideHooks(redial)(connect(mapStateToProps)(SearchPage));
