import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
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

const HomePage = ({ menus }) => (
  <div>
    <Header menus={menus} />
    <div className={css(styles.body)}>首頁內容</div>
  </div>
);

const styles = StyleSheet.create({
  body: {
    height: 300
  }
});

HomePage.propTypes = {
  menus: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(HomePage));
