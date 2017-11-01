import React, { PureComponent } from 'react';
import Modal from 'react-overlays/lib/Modal';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DFP } from '../Ad';

// import { selectInterest, loadInterest } from '../../../modules/interest';

class Idle extends PureComponent {
  constructor (props) {
    super(props);
    this.open = this.open.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
    this.state = {
      showIdle: false
    };
  }

  componentDidMount () {
    this.attachScrollListener();
  }

  componentDidUpdate () {
    this.attachScrollListener();
  }

  componentWillUnmount () {
    this.detachScrollListener();
  }

  attachScrollListener () {
    const scrollEl = window;
    scrollEl.addEventListener('click', this.scrollListener);
    scrollEl.addEventListener('mousemove', this.scrollListener);
    scrollEl.addEventListener('resize', this.scrollListener);
    scrollEl.addEventListener('scroll', this.scrollListener);
  }

  close = () => {
    this.setState({ showIdle: false });
  }

  detachScrollListener () {
    const scrollEl = window;
    scrollEl.removeEventListener('click', this.scrollListener);
    scrollEl.removeEventListener('mousemove', this.scrollListener);
    scrollEl.removeEventListener('resize', this.scrollListener);
    scrollEl.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener () {
    const timer = 1 * 1000;
    if (this.idleInterval) {
      window.clearInterval(this.idleInterval);
    }
    this.idleInterval = window.setInterval(this.open, timer);
  }

  open = () => {
    this.setState({ showIdle: true });
  }

  render () {
    const ad1 = '/5799246/Nownews_home_970x250_T_new2';
    const ad2 = '/5799246/Nownews_all_article_300x250_artm';

    return (
      <Modal
        aria-labelledby='modal-label'
        style={modalStyle}
        backdropClassName={css(styles.backdropStyle)}
        show={this.state.showIdle}
        onHide={this.close}>
        <div className={css(styles.dialog)}>
          <span className={css(styles.closeBtn)} onClick={this.close}>✖ 關閉</span>
          <div>
            <div className={css(styles.dialogTitle)}>本頁面已經閒置超過10分鐘，您可以點擊空白處回原網址，NOWnews關心您</div>
            <div className={css(styles.dialogContent)}>
              <div>
                <a href='/' className={css(styles.newsBlock)}>
                  <img className={css(styles.newsImg)} src='/subWebBanner_colorful/pinknow.jpg' />
                  <h3>本頁面已經閒置超過10分鐘，您可以點擊空白處回原網址</h3>
                </a>
                <a href='/' className={css(styles.newsBlock)}>
                  <img className={css(styles.newsImg)} src='/subWebBanner_colorful/pinknow.jpg' />
                  <h3>本頁面已經閒置超過10分鐘，您可以點擊空白處回原網址</h3>
                </a>
                <a href='/' className={css(styles.newsBlock)}>
                  <img className={css(styles.newsImg)} src='/subWebBanner_colorful/pinknow.jpg' />
                  <h3>本頁面已經閒置超過10分鐘，您可以點擊空白處回原網址</h3>
                </a>
              </div>
              <div className={css(styles.clearfix)} />
              <div className={css(styles.dfp970x50)}>
                {ad1 && <DFP opts={[ad1, [[970, 90], [728, 90]]]} />}
              </div>
              <div>
                <div className={css(styles.listNews)}>
                  <a href='/news/20171101/2635686' className={css(styles.newsLink)}>
                    <span className={css(styles.newsMenu)}>財經</span>
                    <span>蘋果股價創高　台股再戰10800</span>
                  </a>
                  <a href='/news/20171101/2635686' className={css(styles.newsLink)}>
                    <span className={css(styles.newsMenu)}>財經</span>
                    <span>蘋果股價創高　台股再戰10800</span>
                  </a>
                  <a href='/news/20171101/2635686' className={css(styles.newsLink)}>
                    <span className={css(styles.newsMenu)}>財經</span>
                    <span>蘋果股價創高　台股再戰10800</span>
                  </a>
                  <a href='/news/20171101/2635686' className={css(styles.newsLink)}>
                    <span className={css(styles.newsMenu)}>財經</span>
                    <span>蘋果股價創高　台股再戰10800</span>
                  </a>
                  <a href='/news/20171101/2635686' className={css(styles.newsLink)}>
                    <span className={css(styles.newsMenu)}>財經</span>
                    <span>蘋果股價創高　台股再戰10800</span>
                  </a>
                  <a href='/news/20171101/2635686' className={css(styles.newsLink)}>
                    <span className={css(styles.newsMenu)}>財經</span>
                    <span>蘋果股價創高　台股再戰10800</span>
                  </a>
                </div>
                <div className={css(styles.dfp300x250)}>
                  {ad2 && <DFP opts={[ad2, [[300, 250], [336, 280]]]} />}
                </div>
                <div className={css(styles.clearfix)} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
};

const top = 50;
const left = 50;
const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

const styles = StyleSheet.create({
  backdropStyle: {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.5
  },
  closeBtn: {
    backgroundColor: '#000000',
    border: 0,
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: 16,
    right: -70,
    textDecoration: 'none',
    top: 0,
    padding: '5px 10px',
    position: 'absolute',
    ':hover': {
      opacity: 0.6
    }
  },
  dialog: {
    textAlign: 'center',
    position: 'absolute',
    width: 1000,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)'
    // display: 'none'
  },
  dialogTitle: {
    backgroundColor: '#fec340',
    padding: 16
  },
  dialogContent: {
    paddingLeft: 15
  },
  newsBlock: {
    display: 'block',
    float: 'left',
    width: '300px',
    margin: '20px 12px 0'
  },
  newsImg: {
    width: 300,
    height: 180
  },
  dfp970x50: {
    width: 970,
    margin: '17px 0'
  },
  dfp300x250: {
    width: 300,
    float: 'left'
  },
  listNews: {
    width: '665px',
    float: 'left',
    paddingBottom: '20px'
  },
  newsLink: {
    display: 'block',
    textAlign: 'left',
    borderTop: '1px solid #a8a9aa',
    padding: '9px 0',
    margin: '0 20px',
    color: '#000',
    textDecoration: 'none',
    ':last-child': {
      borderBottom: '1px solid #A8A9AA'
    }
  },
  newsMenu: {
    backgroundColor: '#fec340',
    padding: '7px 12px',
    marginRight: '15px'
  },
  clearfix: {
    clear: 'both'
  }
});

export default Idle;
