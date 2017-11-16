import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import AdBlock from './components/AdBlock';
import { Container } from '../Layout';

export const Footer = ({ ads }) => {
  let moreAds = [];
  if (ads.grabBag) {
    moreAds.push({ isExternal: true, ...ads.grabBag[0] });
    moreAds.push({ isExternal: true, ...ads.grabBag[2] });
    moreAds.push({ isExternal: true, ...ads.grabBag[3] });
  }

  const moreList = [
    { isExternal: false, title: '立院直播', url: '/lylive/1' },
    { isExternal: false, title: '名家論壇', url: '/cat/celebritycomment' },
    ...moreAds,
    { isExternal: false, title: '公益行善', url: '/cat/public' },
    { isExternal: false, title: '色區', url: '/cat/hotzone' }
  ];
  const socialList = [
    { icon: 'FB', url: 'https://facebook.com/nownews' },
    { icon: 'IG', url: 'https://www.instagram.com/nownews/' },
    { icon: 'weibo', url: 'http://tw.weibo.com/nownews' },
    { icon: 'twitter', url: 'https://twitter.com/NOWnews_TW' }
  ];

  return (
    <Container>
      <div className={css(styles.footer)}>
        {ads.footer && <div className={css(styles.adBlocks)}>
          {ads.footer.map((ad, index) => <AdBlock key={index} ad={ad} />)}
        </div>}
        <hr className={css(styles.hr)} />
        <div className={`clearfix ${css(styles.announce)}`}>

          {/* More NOWnews */}
          <div className='left' style={{ width: '25%' }}>
            <label className={css(styles.groupTitle)}>More NOWnews</label>
            <div style={{ width: 200 }}>
              { moreList.map(({ isExternal, title, url }, i) =>
                <Link className={css(styles.moreLink)}
                  key={i}
                  target={isExternal === true ? '_blank' : null}
                  to={url}>{ title }</Link>
              )}
            </div>
          </div>

          {/* Follow, About, Partner */}
          <div className='left' style={{ width: '25%' }}>
            <label className={css(styles.groupTitle)}>Follow Us</label>
            { socialList.map(({ icon, url }) =>
              <Link className={css(styles.btnSocial)} key={icon} target='_blank' to={url}>
                <img src={`/social/${icon}.png`} alt={icon} />
              </Link>
            )}
            <Link className={css(styles.groupTitle)}
              target='_blank' to='https://m.nownews.com/about'>About NOWnews</Link>
            {/* 董哥：合作夥伴先拉掉不放 */}
            {/* <Link className={css(styles.groupTitle)}
              target='_blank' to='/info/partner'>合作夥伴</Link> */}
          </div>

          {/* Contact Us */}
          <div className='left' style={{ width: '35%' }}>
            <label className={css(styles.groupTitle)}>Contact Us</label>
            <div className={css(styles.btnEmail)}>
              <a href='mailto:public@nownews.com,service@nownews.com' target='_top'>
                <img src='/icons/email.png' />
              </a>
            </div>
            <p className={css(styles.contactInfo)}>T: +886 2 8797 8775</p>
            <p className={css(styles.contactInfo)}>F: +886 2 8797 8339</p>
            <p className={css(styles.contactInfo)}>11493 台北市內湖區堤頂大道二段 407 巷 32 號 4 樓</p>
          </div>

          {/* Member, Download App */}
          <div className='right' style={{ textAlign: 'right', width: '15%' }}>
            {/* 隱藏會員相關 */}
            {/* <Link className={css(styles.btnMember)} to='/auth/oauth'>加入會員</Link> */}
            <Link target='_blank' to='https://itunes.apple.com/tw/app/nownews-v1/id388356807?mt=8'>
              <img src='/app/dark_ios.png' />
            </Link>
            <Link target='_blank' to='https://play.google.com/store/apps/details?id=com.nownews&hl=zh_TW'>
              <img src='/app/dark_android.png' />
            </Link>
          </div>
        </div>
        <hr className={css(styles.hr)} />
        <div className={`clearfix ${css(styles.announce)}`}>
          <div>
            今日傳媒(股)公司版權所有，非經授權，不許轉載本網站內容 © 2017 NOWnews.com. All Rights Reserved.
          </div>
          <div className='right'>
            <Link className={css(styles.annoucneLink)}
              target='_blank' to='/info/disclaimer'>免責聲明</Link>
            <Link className={css(styles.annoucneLink)}
              target='_blank' to='/info/privacy'>隱私權聲明</Link>
            <Link className={css(styles.annoucneLink)}
              target='_blank' to='/info/copyright'>著作權聲明</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mainGray = '#98999A';
const styles = StyleSheet.create({
  adBlocks: {
    display: 'inline-flex'
  },
  announce: {
    color: mainGray,
    fontSize: 12,
    padding: '5px 22px'
  },
  annoucneLink: {
    color: mainGray,
    marginLeft: 15,
    textDecoration: 'none'
  },
  btnEmail: {
    margin: '8px 0'
  },
  btnMember: {
    background: '#CBCCCD',
    color: '#000000',
    display: 'block',
    float: 'right',
    fontSize: 20,
    height: 30,
    lineHeight: '30px',
    marginBottom: 10,
    textAlign: 'center',
    textDecoration: 'none',
    width: 116
  },
  btnSocial: {
    marginRight: 8
  },
  contactInfo: {
    margin: '3px 0'
  },
  footer: {
    backgroundColor: '#323334',
    marginTop: '1rem',
    padding: '1rem 0'
  },
  groupTitle: {
    color: mainGray,
    display: 'block',
    fontWeight: 'bold',
    fontSize: 16,
    margin: '8px 0',
    textDecorationColor: mainGray
  },
  hr: {
    backgroundColor: mainGray,
    border: 0,
    height: 1,
    width: '97%'
  },
  moreLink: {
    color: '#CBCCCD',
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 3,
    textDecoration: 'none',
    width: 80
  }
});

Footer.propTypes = {
  ads: PropTypes.object
};

export default Footer;
