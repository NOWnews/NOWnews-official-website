import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
// import FontAwesome from 'react-fontawesome';
import { StyleSheet, css } from 'aphrodite/no-important';
import { selectAuthorPage, loadAuthorData } from '../module';

import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';

import { Header } from '../../../components/Header';
// import ListItem from '../../../components/News/ListItem';
import { Container } from '../../../components/Layout';
// import Pagination from '../../../components/Pagination';

// import { TimeAndKeywordArea } from '../components';
import { BlockItem6, AuthorInfo } from '../components';
const redial = {
  fetch: ({ dispatch, params: { authorId }, query: { page } }) => Promise.all([
    dispatch(loadAuthorData(authorId)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  authorPage: selectAuthorPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

class AuthorPage extends Component {

  render () {
    let { menus, authorPage, marquee } = this.props;
    let { isLoading, newsList } = authorPage;
    // let { isLoading, list, hotKeywords, pageData, keyword, timeRange } = searchPage;

    return (
      <Container>
        <Header menus={menus} marquee={marquee} />
        <div className={css(styles.box)}>
          <AuthorInfo authorData={{name: 'jason'}} />
          { isLoading && <h1>true</h1> }
          <BlockItem6 newsList={newsList} />
        </div>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    height: 825
  }
});

AuthorPage.propTypes = {
  // loadAuthorData: PropTypes.func.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired,
  authorPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(AuthorPage));
