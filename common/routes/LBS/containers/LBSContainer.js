import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { bindActionCreators } from 'redux';

import { selectLBS, loadLBSList } from '../../../modules/LBS';
import { loadHeader, selectMarquee, selectMenus } from '../../../modules/header';
import { selectLocal } from '../../../modules/sourceRequest';

import { BlockItems } from '../components';
import { Header } from '../../../components/Header';
import { TripletHead } from '../../../components/News';
import { Container, Loading } from '../../../components/Layout';
import { DFP, OneAdICIP } from '../../../components/Ad';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadHeader()),
    dispatch(loadLBSList())
  ])
};

const mapStateToProps = state => ({
  LBS: selectLBS(state),
  local: selectLocal(state),
  marquee: selectMarquee(state),
  menus: selectMenus(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  loadLBSList
});

class LBSContainer extends Component {

  componentDidMount () {
    this.props.loadLBSList();
  }

  render () {
    const { marquee, menus, LBS, local } = this.props;
    const { isLoading, isLocationLoading, lastFetched, mapCity, newsList, pageData, error } = LBS;
    return (
      <div>
        <Header menus={menus} marquee={marquee} />
        <OneAdICIP />
        <TripletHead active='lbs' city={mapCity} />
        <Container>
          {isLoading && <Loading />}
          {isLocationLoading && !error && <h3>尚未取得您的位置資訊，正在載入中 ...</h3>}
          { error && error.code === 1 && <h3> 您拒絕提供位置資訊給我們，因此無法載入您的區域新聞 T____T </h3>}
          { error && (error.code === 2 || error.code === 3) && <h3> 無法取得您的位置資訊 </h3>}
          {lastFetched && !error && !isLoading && !isLocationLoading && newsList.length === 0 && <h3>查無此區的相關新聞 ...</h3>}
          {!isLoading && newsList.length > 0 &&
            <BlockItems newsList={newsList} page={pageData} local={local} />
          }
          <DFP opts={['/5799246/Nownews_home_970x250_B_new2', [[970, 250], [970, 90]], 'div-gpt-ad-1496983308222-0']} />
        </Container>
      </div>
    );
  }
}

LBSContainer.propTypes = {
  loadLBSList: PropTypes.func.isRequired,
  local: PropTypes.object.isRequired,
  menus: PropTypes.array.isRequired,
  marquee: PropTypes.object.isRequired,
  LBS: PropTypes.object.isRequired
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(LBSContainer));
