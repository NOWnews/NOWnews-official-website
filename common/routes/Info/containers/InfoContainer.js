import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { Header } from '../../../components/Header';
import { Container } from '../../../components/Layout';
import { selectLocal } from '../../../modules/sourceRequest';

const redial = {
  fetch: ({ dispatch, params: { type } }) => Promise.all([
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  local: selectLocal(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const InfoContainer = ({ local, marquee, menus, children }) => {
  return (
    <Container>
      <Header menus={menus} marquee={marquee} />
      { children }
    </Container>
  );
};

InfoContainer.propTypes = {
  local: PropTypes.object.isRequired,
  children: PropTypes.shape().isRequired,
  menus: PropTypes.array.isRequired,
  marquee: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InfoContainer));
