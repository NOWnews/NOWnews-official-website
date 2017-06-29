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
import { Container, Loading, NotFound } from '../../../components/Layout';
import { DFP, OneAdIR, OneAdICIP } from '../../../components/Ad';

const redial = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(loadHeader())
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
    const { isLoading, location, mapCity, newsList, pageData } = LBS;
    return (
      <div>
        <OneAdICIP />
        <Header menus={menus} marquee={marquee} />
        <TripletHead active='lbs' city={mapCity} />
        <Container>
          {isLoading && <Loading />}
          {!isLoading && location.length === 0 && <h3>尚未取得您的位置資訊</h3>}
          {!isLoading && newsList.length === 0 && <NotFound />}
          {!isLoading && newsList.length > 0 &&
            <BlockItems newsList={newsList} page={pageData} local={local} />
          }
          <OneAdIR />
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
