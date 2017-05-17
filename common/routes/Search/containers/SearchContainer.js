import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import moment from 'moment';
import { selectSearchPage, loadSearchList } from '../module';

import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';

import { Header } from '../../../components/Header';
import ListItem from '../../../components/News/ListItem';
import { Container, Loading, Margin10, NotFound } from '../../../components/Layout';
import Pagination from '../../../components/Pagination';

import { TimeAndKeywordArea } from '../components';
import generateNewsUrl from '../../../../lib/generateNewsUrl';

const redial = {
  fetch: ({ dispatch, query }) => Promise.all([
    dispatch(loadSearchList(query)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  searchPage: selectSearchPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  loadSearchList
});

class SearchPage extends Component {
  constructor (props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm () {
    let { timeRange, pageData: { currentPage: page } } = this.props.searchPage;
    let keyword = this.searchInput.value;
    this.props.loadSearchList({ keyword, page, timeRange });
  }

  render () {
    let { loadSearchList, menus, searchPage, marquee } = this.props;
    let { isLoading, list, hotKeywords, pageData, keyword, timeRange } = searchPage;

    return (
      <Container>
        <Header menus={menus} marquee={marquee} />
        <Margin10 className='center'>
          <input type='hidden' name='timeRange' value={timeRange} />
          <input type='text' key={keyword} name='keyword' placeholder='搜尋'
            ref={ref => { this.searchInput = ref; }}
            className={`input ${css(styles.searchInput)}`} defaultValue={keyword} />
          <button type='submit' className={css(styles.submitButton)}
            onClick={this.submitForm}>
            <FontAwesome name='search' style={{fontSize: 20}}
              className={css(styles.searchIcon)} />
          </button>
        </Margin10>
        <Margin10 className='clearfix'>
          <TimeAndKeywordArea loadSearchList={loadSearchList}
            hotKeywords={hotKeywords} keyword={keyword} timeRange={timeRange} />
          <div className='left'>
            {isLoading && <Loading /> }
            {!isLoading && list.length === 0 && <NotFound />}
            {!isLoading && list.length > 0 &&
              <div>
                {list.map((value, i) => (
                  <ListItem
                    key={value.sn}
                    category={value.MainMenu && value.MainMenu.name || 'Sponsored'}
                    photo={value.MainPhoto}
                    title={value.title}
                    time={moment(value.formatStartedAt).format('YYYY/MM/DD')}
                    url={generateNewsUrl(value.sn, value.formatStartedAt)} />
                ))}
              </div>
            }
          </div>
        </Margin10>
        <Pagination {...pageData} />
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
  }
});

SearchPage.propTypes = {
  loadSearchList: PropTypes.func.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired,
  searchPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
