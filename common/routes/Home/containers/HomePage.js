import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { StyleSheet, css } from 'aphrodite/no-important';
import moment from 'moment';
import Header from '../../../components/Header';
import ListItem from '../../../components/News/ListItem';
import { loadMenus, selectMenus } from '../../../modules/menus';
import { selectHomePage, loadHomeList } from '../module';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadHomeList()),
    dispatch(loadMenus())
  ])
};

const mapStateToProps = state => ({
  homePage: selectHomePage(state),
  menus: selectMenus(state)
});

const HomePage = ({ menus, homePage }) => (
  <div>
    <Header menus={menus} />
    <div> 首頁輪播 </div>
    <div className={css(styles.body)}>首頁內容</div>
    {homePage.isLoading &&
      <div>
        <h2>Loading ...</h2>
      </div>}
    {!homePage.isLoading && homePage.data.length === 0 &&
      <div>查無相關新聞 ... </div>}
    {!homePage.isLoading && homePage.data.length > 0 &&
      <div>
        {homePage.data.map((value, i) => (
          <ListItem
            key={value.sn}
            category={value.MainMenu && value.MainMenu.name || 'Sponsored'}
            photo={value.MainPhoto}
            title={value.shortTitle}
            time={moment(value.formatStartedAt).format('YYYY/MM/DD')}
            url={`/news/${moment(value.formatStartedAt).format('YYYYMMDD')}/${value.sn}`} />
        ))}
      </div>
    }
  </div>
);

const styles = StyleSheet.create({
  body: {
    height: 300
  }
});

HomePage.propTypes = {
  menus: PropTypes.object.isRequired,
  homePage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(HomePage));
