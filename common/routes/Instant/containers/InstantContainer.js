import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { selectInstantPage, loadInstantList } from '../module';
import { selectLocal } from '../../../modules/sourceRequest';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';

import { Header } from '../../../components/Header';
import { LatestVideoNav, ListItem, SpecialTopicNav, TripletHead } from '../../../components/News';
import { DFP, OneAdIR, OneAdICIP } from '../../../components/Ad';
import { Container, RightSide, LeftSide, Loading, Margin10, NotFound } from '../../../components/Layout';
import Pagination from '../../../components/Pagination';

const redial = {
  fetch: ({ dispatch, query: { page } }) => Promise.all([
    dispatch(loadInstantList(page)),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  local: selectLocal(state),
  instantPage: selectInstantPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const InstantContainer = ({ local, marquee, menus, instantPage }) => (
  <div>
    <OneAdICIP />
    <Header menus={menus} marquee={marquee} />
    <TripletHead active='instant' />
    <Container>
      <Margin10 className='clearfix'>
        <LeftSide>
          {instantPage.isLoading && <Loading />}
          {!instantPage.isLoading && instantPage.newsList.length === 0 && <NotFound />}
          {!instantPage.isLoading && instantPage.newsList.length > 0 &&
            <div>
              {instantPage.newsList.map((value, i) => (
                <ListItem
                  key={value.sn}
                  category={value.MainMenu && value.MainMenu.name || 'Sponsored'}
                  photo={value.MainPhoto}
                  title={value.title}
                  time={value.formatStartedAt}
                  type={value.type}
                  url={value.parseUrl} />
              ))}
            </div>
          }
          <Margin10>
            <Pagination {...instantPage.pageData} {...local} />
          </Margin10>
        </LeftSide>
        <RightSide>
          <DFP opts={['/5799246/Nownews_home_300x250_M1_new2', [300, 250], 'div-gpt-ad-1496983171426-0']} />
          <SpecialTopicNav list={instantPage.topics} />
          <LatestVideoNav list={instantPage.videos} />
          <DFP opts={['/5799246/Nownews_home_300x250_M2_new2', [300, 250], 'div-gpt-ad-1496983198899-0']} />
        </RightSide>
      </Margin10>
      <OneAdIR />
      <DFP opts={['/5799246/Nownews_home_970x250_B_new2', [[970, 250], [970, 90]], 'div-gpt-ad-1496983308222-0']} />
    </Container>
  </div>
);

InstantContainer.propTypes = {
  local: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  marquee: PropTypes.object.isRequired,
  instantPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InstantContainer));
