import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { Header } from '../../../components/Header';
import { Container } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch, params: { type } }) => Promise.all([
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const InfoContainer = ({ marquee, menus, children }) => {
  return (
    <Container>
      <Header menus={menus} marquee={marquee} />
      { children }
    </Container>
  );
};

InfoContainer.propTypes = {
  children: PropTypes.shape().isRequired,
  menus: PropTypes.array.isRequired,
  marquee: PropTypes.array.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InfoContainer));
