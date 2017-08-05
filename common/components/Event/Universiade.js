import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import Modal from 'react-overlays/lib/Modal';
import FontAwesome from 'react-fontawesome';

class Universiade extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  close = () => {
    this.setState({ isOpen: false });
  }

  render () {
    const data = this.props.data;
    if (!data) {
      return null;
    }
    return (
      <Modal
        aria-labelledby='modal-label'
        backdrop='static'
        style={modalStyle}
        backdropClassName={css(styles.backdropStyle)}
        show={this.state.isOpen}
        onHide={this.close}>
        <div className={css(styles.dialog)}>
          <span className={css(styles.closeBtn)} onClick={this.close}>✖ 關閉</span>
          <div className='relative'>
            <FontAwesome className={css(styles.hint)} name='comment' flip='horizontal' />
            <span className={css(styles.hintWord)}>拍我！</span>
          </div>
          <img src={`/events/201708_universiade/${data.kind}.gif`} />
          <div className={css(styles.no)}>{data.createdAt}_{data.id}</div>
          <a className={css(styles.callToAction)} href='https://www.facebook.com/nownews' target='_blank'>
            為世大運加油<br />
            快來參加活動！
          </a>
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
  callToAction: {
    background: '#F15BA6',
    display: 'block',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
    width: 450,
    padding: '12px 0',
    fontSize: 30
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
      fontWeight: 'bold'
    }
  },
  dialog: {
    textAlign: 'center',
    outlineStyle: 'none',
    position: 'absolute',
    width: 500,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    padding: 20
  },
  hint: {
    left: 0,
    color: '#F9BA2B',
    fontSize: 160,
    position: 'absolute'
  },
  hintWord: {
    color: 'white',
    position: 'absolute',
    left: 24,
    top: 44,
    fontSize: 45
  },
  no: {
    color: '#cccccc',
    position: 'relative',
    top: -5
  }
});

Universiade.propTypes = {
  data: PropTypes.object
};
export default Universiade;
