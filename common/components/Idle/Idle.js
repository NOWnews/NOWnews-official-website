import React, { PureComponent, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Modal from 'react-overlays/lib/Modal';
import { StyleSheet, css } from 'aphrodite/no-important';
import { DFP } from '../Ad';

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
    scrollEl.top.addEventListener('keydown', this.scrollListener);
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
    scrollEl.top.removeEventListener('keydown', this.scrollListener);
  }

  scrollListener () {
    const timer = 90 * 1000;
    if (this.idleInterval) {
      window.clearInterval(this.idleInterval);
    }
    this.idleInterval = window.setInterval(this.open, timer);
  }

  open = () => {
    this.setState({ showIdle: true });
  }

  render () {
    const ad1 = '/5799246/Nownews_idle_970x90';
    const ad2 = '/5799246/NOWnews_idle_300x250';
    let big3 = [];
    let small6 = [];
    this.props.idleNews.forEach((news, index) => {
      if (index > 2) {
        small6.push(news);
      } else {
        big3.push(news);
      }
    });

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
            <div className={css(styles.dialogTitle)}>
              本頁面已經閒置超過90秒，您可以點擊空白處回原網址，NOWnews關心您
              <img className={css(styles.dialogIcon)} src='/icons/sleep.png' />
            </div>
            <div className={css(styles.dialogContent)}>
              <div>
                {big3.map(({ shortTitle, parseUrl, _id, MainPhoto }) => (
                  <Link data-on='click' data-event-category='idle' data-event-action='block-news'
                    className={css(styles.newsBlock)} key={_id} to={`${parseUrl}?from=idleblock`} onClick={this.close}>
                    <div className={css(styles.imgBlock)}>
                      <img className={css(styles.newsImg)} src={MainPhoto && MainPhoto.thumbnail} />
                    </div>
                    <h3>{ shortTitle }</h3>
                  </Link>
                ))}
              </div>
              <div className={css(styles.clearfix)} />
              <div className={css(styles.dfp970x50)}>
                <DFP opts={[ad1, [[970, 90], [728, 90]]]} />
              </div>
              <div>
                <div className={css(styles.listNews)}>
                  {small6.map(({ shortTitle, parseUrl, _id, MainMenu }) => (
                    <Link data-on='click' data-event-category='idle' data-event-action='list-news'
                      className={css(styles.newsLink)} key={_id} to={`${parseUrl}?from=idlelist`} onClick={this.close}>
                      <span className={css(styles.newsMenu)}>{MainMenu.name}</span>
                      <span>{ shortTitle }</span>
                    </Link>
                  ))}
                </div>
                <div className={css(styles.dfp300x250)}>
                  <DFP opts={[ad2, [[300, 250], [336, 280]]]} />
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

Idle.propTypes = {
  idleNews: PropTypes.array
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
  },
  dialogTitle: {
    backgroundColor: '#fec340',
    padding: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  dialogIcon: {
    position: 'relative',
    marginTop: -17,
    top: 10,
    left: 10
  },
  dialogContent: {
    paddingLeft: 15
  },
  newsBlock: {
    display: 'block',
    float: 'left',
    width: '300px',
    margin: '20px 12px 0',
    textDecoration: 'none',
    color: '#333'
  },
  imgBlock: {
    width: 300,
    height: 168,
    overflow: 'hidden'
  },
  newsImg: {
    width: 300,
    position: 'relative',
    top: -30
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
