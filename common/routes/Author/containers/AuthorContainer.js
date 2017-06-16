import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import { selectAuthorPage, loadAuthorData } from '../module';
import { selectLocal } from '../../../modules/sourceRequest';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { Header } from '../../../components/Header';
import { Container, Margin10, Loading, NotFound } from '../../../components/Layout';
import { DFP } from '../../../components/Ad';
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
    const { local, menus, authorPage, marquee } = this.props;
    const { isLoading, newsList } = authorPage;
    return (
      <Container>
        <Header menus={menus} marquee={marquee} />
        {isLoading && <Loading />}
        {!isLoading && newsList.length === 0 && <NotFound />}
        {!isLoading && newsList.length > 0 && <Margin10>
          <div className={css(styles.box)}>
            <AuthorInfo authorData={newsList[0].Author || {}} />
            <BlockItem6 newsList={newsList} />
          </div>
          <Pagination {...authorPage.pageData} {...local} />
        </Margin10>}
        <DFP opts={['/5799246/Nownews_home_970x250_B_new2', [[970, 250], [970, 90]], 'div-gpt-ad-1496983308222-0']} />
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
  marquee: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  authorPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(AuthorPage));
