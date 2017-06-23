import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Modal from 'react-overlays/lib/Modal';
import isomorphicCookie from 'isomorphic-cookie';
import moment from 'moment';

class CrazyAd extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount () {
    if (!isomorphicCookie.load('NOW_CrazyFlag')) {
      this.setState({ isOpen: true });
      isomorphicCookie.save('NOW_CrazyFlag', 'NOW_CrazyFlag', {
        secure: false,
        expires: new Date(moment().add(1, 'day'))
      });
    }
  }

  close = () => {
    this.setState({ isOpen: false });
  }

  render () {
    const { img, title, type, video } = this.props.ad;
    return (
      <Modal
        aria-labelledby='modal-crazy'
        backdrop='static'
        style={modalStyle}
        backdropClassName={css(styles.backdropStyle)}
        show={this.state.isOpen}
        onHide={this.close}>
        <div className={css(styles.dialog)}>
          <span className={css(styles.btn)} onClick={this.close}>✖ 關閉</span>
          {type === 'VIDEO' && <iframe width='1024' height='576' src={`${video}&autoplay=1`} frameVorder='0' allowFullScreen />}
          {type === 'PHOTO' && <img width='780' height='480' alt={title} src={img} />}
        </div>
      </Modal>
    );
  }
}

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
  btn: {
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
    outline: 'none',
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)'
  }
});

CrazyAd.propTypes = {
  ad: PropTypes.object
};

export default CrazyAd;
