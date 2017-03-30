import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import Header from '../../../components/Header';
import Header from '../../../components/Header';
import { loadMenus, selectMenus } from '../../../modules/menus';


const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadMenus())
  ])
};

const mapStateToProps = state => ({
  menus: selectMenus(state)
});

const InstantPage = ({ menus }) => (
  <div className={css(styles.aaa)}>
    <Header menus={menus} />
  </div>
);

const styles = StyleSheet.create({
  // container,
  body: {
    background: '#fff'
  },
  aaa: {

  }
});

InstantPage.propTypes = {
  menus: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InstantPage));
