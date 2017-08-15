import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Helmet from 'react-helmet';
import { GTM } from './Tracking';
import { connect } from 'react-redux';
import StaticContainer from 'react-static-container';
import { init } from '../../lib/track/pageview';
import { firebaseInit } from '../../lib/firebase/notification';

// import Idle from './Idle';

// 有要測試 Perf 的時候才打開，chrome 記得安裝相關套件
// import Perf from 'react-addons-perf';

const mapStateToProps = state => ({
  state
});

class Basic extends PureComponent {
  componentDidMount () {
    // 有要測試 Perf 的時候才打開，chrorme 記得安裝相關套件
    // window.Perf = Perf;

    // For first time SSR
    const state = this.props.state;
    const { apiServ, headers } = state.sourceRequest;
    const { pathname, search } = window.location;
    init(apiServ, pathname, search, state, headers);

    if ('Notification' in window) {
      firebaseInit(apiServ, headers);
    }
  }

  render () {
    return (
      <div className={css(styles.root)}>
        <StaticContainer>
          <div>
            <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞'
              meta={[
                {name: 'msvalidate.01', content: 'DD4BB84D2BD1EE97A75961E31C37B771'},
                {name: 'google-site-verification', content: 'IpBBA_rIUzM0_7nqKskLksd7Rg-aFVbhQyD7DKZT-Ac'},
                {name: 'yandex-verification', content: '13823ecdc776d08c'},
                {charset: 'utf-8'},
                {property: 'fb:app_id', content: 132863386747341},
                {property: 'fb:pages', content: 102884532662}
              ]} />
            <GTM gtmId='GTM-W25KLJG' />
          </div>
        </StaticContainer>
        {/* 目前先不放 <Idle /> */}
        {this.props.children}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    color: '#000'
  }
});

Basic.propTypes = {
  children: PropTypes.any.isRequired,
  state: PropTypes.object
};
export default connect(mapStateToProps)(Basic);
