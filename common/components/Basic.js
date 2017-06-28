import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Helmet from 'react-helmet';
import { GTM } from './Tracking';
import StaticContainer from 'react-static-container';
// import Idle from './Idle';

// 有要測試 Perf 的時候才打開，chrome 記得安裝相關套件
// import Perf from 'react-addons-perf';

class Basic extends PureComponent {
  // 有要測試 Perf 的時候才打開，chrome 記得安裝相關套件
  // componentDidMount () {
  //   window.Perf = Perf;
  // }

  render () {
    return (
      <div className={css(styles.root)}>
        <StaticContainer>
          <div>
            <Helmet title='NOWnews 今日新聞' titleTemplate='NOWnews 今日新聞'
              link={[
                {async: 'async', rel: 'stylesheet', href: '/vendor/basscss.min.css'},
                {async: 'async', rel: 'stylesheet', href: '/vendor/font-awesome-4.7.0/css/font-awesome.min.css'},
                {async: 'async', rel: 'stylesheet', href: '/vendor/carousel.min.css'},
                {async: 'async', rel: 'stylesheet', href: '/vendor/video-js.min.css'}
              ]}
              meta={[
                {name: 'google-site-verification', content: 'IpBBA_rIUzM0_7nqKskLksd7Rg-aFVbhQyD7DKZT-Ac'},
                {charset: 'utf-8'},
                {property: 'fb:app_id', content: 132863386747341},
                {property: 'fb:pages', content: 102884532662}
              ]} />
            <GTM gtmId='GTM-W25KLJG' />
            <script dangerouslySetInnerHTML={{__html: `
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                ga('create', 'UA-4021556-54', 'auto');
                ga('create', 'UA-4021556-26', {'name':'26'});
                ga('send', 'pageview');
                ga('26.send', 'pageview');
              `}} />
            <script dangerouslySetInnerHTML={{__html: `
                var _comscore = _comscore || [];
                _comscore.push({ c1: "2", c2: "11473067" });
                (function() {
                  var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                  s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                  el.parentNode.insertBefore(s, el);
                })();
              `}} />
            <noscript dangerouslySetInnerHTML={{__html: `
                <img src='http://b.scorecardresearch.com/p?c1=2&c2=11473067&cv=2.0&cj=1' />
              `}} />
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
  children: PropTypes.any.isRequired
};
export default Basic;
