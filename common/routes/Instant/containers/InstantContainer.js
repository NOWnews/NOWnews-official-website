import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import moment from 'moment';
import { selectInstantPage, loadInstantList } from '../module';

import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';

import { Header } from '../../../components/Header';
import { LatestVideoNav, ListItem, SpecialTopicNav, TripletHead } from '../../../components/News';
import { Ad300x250 } from '../../../components/Ad';
import { Container, RightSide, LeftSide, Loading, Margin10, NotFound } from '../../../components/Layout';
import Pagination from '../../../components/Pagination';
import generateNewsUrl from '../../../../lib/generateNewsUrl';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadInstantList()),
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  instantPage: selectInstantPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const InstantContainer = ({ marquee, menus, instantPage }) => (
  <div>
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
                  time={moment(value.formatStartedAt).format('YYYY/MM/DD')}
                  url={generateNewsUrl(value.sn, value.formatStartedAt)} />
              ))}
            </div>
          }
          <Margin10>
            <Pagination {...instantPage.pageData} />
          </Margin10>
        </LeftSide>
        <RightSide>
          <Ad300x250 />
          <SpecialTopicNav list={instantPage.topics.slice(0, 6)} />
          <LatestVideoNav list={instantPage.videos.slice(0, 4)} />
          <Ad300x250 />
        </RightSide>
      </Margin10>
    </Container>
  </div>
);

InstantContainer.propTypes = {
  menus: PropTypes.array.isRequired,
  marquee: PropTypes.array.isRequired,
  instantPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps)(InstantContainer));
