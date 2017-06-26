import React, { PureComponent } from 'react';
import Modal from 'react-overlays/lib/Modal';
import { StyleSheet, css } from 'aphrodite/no-important';

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
    const timer = 30 * 1000;
    if (this.idleInterval) {
      window.clearInterval(this.idleInterval);
    }
    this.idleInterval = window.setInterval(this.open, timer);
  }

  open = () => {
    this.setState({ showIdle: true });
  }

  render () {
    return (
      <Modal
        aria-labelledby='modal-label'
        style={modalStyle}
        backdropClassName={css(styles.backdropStyle)}
        show={this.state.showIdle}
        onHide={this.close}>
        <div className={css(styles.dialog)}>
          <span className={css(styles.closeBtn)} onClick={this.close}>✖</span>
          <h1>閒置頁面</h1>
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
    color: '#A8A8A8',
    cursor: 'pointer',
    fontSize: 20,
    padding: '2px 5px',
    position: 'absolute',
    right: 0,
    top: 0,
    ':hover': {
      opacity: 0.6
    }
  },
  dialog: {
    textAlign: 'center',
    position: 'relative',
    width: 400,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  }
});

export default Idle;
