import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import { selectAuthorPage, loadAuthorData } from '../module';
import { selectLocal } from '../../../modules/sourceRequest';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { Header } from '../../../components/Header';
import { Container, Margin10, Loading } from '../../../components/Layout';
import Pagination from '../../../components/Pagination';
import { BlockItem6, AuthorInfo } from '../components';
const redial = {
  fetch: ({ dispatch, params: { authorId }, query: { page } }) => Promise.all([
    dispatch(loadAuthorData(authorId, page)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  local: selectLocal(state),
  authorPage: selectAuthorPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

class AuthorPage extends Component {
  render () {
    let { local, menus, authorPage, marquee } = this.props;
    let { isLoading, newsList } = authorPage;
    return (
      <Container>
        <Header menus={menus} marquee={marquee} />
        <Margin10>
          <div className={css(styles.box)}>
            <AuthorInfo authorData={newsList[0].Author} />
            {isLoading && <Loading /> }
            <BlockItem6 newsList={newsList} />
          </div>
          <Pagination {...authorPage.pageData} local={local} />
        </Margin10>
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
  local: PropTypes.object.isRequired,
  marquee: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired,
  authorPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(AuthorPage));
