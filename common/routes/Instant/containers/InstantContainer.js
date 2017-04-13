import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
// import { StyleSheet, css } from 'aphrodite/no-important';
import moment from 'moment';
import { selectInstantPage, loadInstantList } from '../module';

import { loadHeader, selectMenus } from '../../../modules/header';

import Header from '../../../components/Header';
import ListItem from '../../../components/News/ListItem';
import { Container, RightSide, LeftSide } from '../../../components/Layout';
import Pagination from '../../../components/Pagination';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadInstantList()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  instantPage: selectInstantPage(state),
  menus: selectMenus(state)
});

const InstantPage = ({ menus, instantPage }) => (
  <Container className='clearfix'>
    <Header menus={menus} />
    <p>Header</p>
    <LeftSide>
      {instantPage.isLoading &&
        <div>
          <h2>Loading ...</h2>
        </div>}
      {!instantPage.isLoading && instantPage.data.length === 0 &&
        <div>查無相關新聞 ... </div>}
      {!instantPage.isLoading && instantPage.data.length > 0 &&
        <div>
          {instantPage.data.map((value, i) => (
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
    </LeftSide>
    <RightSide>
      <p>300x250 </p>
      <p>專題 </p>
      <p>最新影音 </p>
      <p>300x250 </p>
    </RightSide>
    <Pagination />
  </Container>
);

InstantPage.propTypes = {
  menus: PropTypes.array.isRequired,
  instantPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InstantPage));
