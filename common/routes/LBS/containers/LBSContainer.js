import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { bindActionCreators } from 'redux';

import { selectLBSPage, loadLBSList } from '../module';

import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';

import { Header } from '../../../components/Header';
import { BlockItems12, TripletHead } from '../../../components/News';
import { Container, Loading, NotFound } from '../../../components/Layout';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadHeader())
  ])
};

const mapStateToProps = state => ({
  LBSPage: selectLBSPage(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  loadLBSList
});

class LBSContainer extends Component {

  componentDidMount () {
    const geolocation = window.navigator.geolocation;

    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
      }

      geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, () => {
        reject(new Error('Permission denied'));
      });
    });

    location.then((result) => {
      this.props.loadLBSList(result);
    });
  }

  render () {
    const { marquee, menus, LBSPage } = this.props;
    const { isLoading, location, mapCity, newsList, pageData } = LBSPage;
    return (
      <div>
        <Header menus={menus} marquee={marquee} />
        <TripletHead active='lbs' city={mapCity} />
        <Container>
          {isLoading && <Loading />}
          {location.length === 0 && <h3>尚未取得您的位置資訊</h3>}
          {!isLoading && newsList.length === 0 && <NotFound />}
          {!isLoading && newsList.length > 0 &&
            <BlockItems12 newsList={newsList} page={pageData} />
          }
        </Container>
      </div>
    );
  }
}

LBSContainer.propTypes = {
  menus: PropTypes.array.isRequired,
  marquee: PropTypes.array.isRequired,
  loadLBSList: PropTypes.func.isRequired,
  LBSPage: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(LBSContainer));
