import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadHeader, selectMenus } from '../../../modules/header';
import Header from '../../../components/Header';
import { Container } from '../../../components/Layout';
import * as Components from '../components';

const redial = {
  fetch: ({ dispatch, params: { type } }) => Promise.all([
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  menus: selectMenus(state)
});

const InfoContainer = ({ menus, location: { pathname } }) => {
  let originType = pathname.split('/')[2];
  let upperCaseFirstWord = originType.substring(0, 1).toUpperCase() + originType.substring(1);
  let content = Components[upperCaseFirstWord];
  return (
    <Container>
      <Header menus={menus} />
      { content && content() }
    </Container>
  );
};

InfoContainer.propTypes = {
  menus: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InfoContainer));
