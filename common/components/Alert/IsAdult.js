import React, { PureComponent, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
import Modal from 'react-overlays/lib/Modal';
import FontAwesome from 'react-fontawesome';

class IsAdult extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isNotYetClose: true
    };
  }

  close = () => {
    this.setState({ isNotYetClose: false });
  }

  render () {
    return (
      <Modal
        aria-labelledby='modal-label'
        backdrop='static'
        style={modalStyle}
        backdropClassName={css(styles.backdropStyle)}
        show={(this.props.isAdult && this.state.isNotYetClose)}
        onHide={this.close}>
        <div className={css(styles.dialog)}>
          <FontAwesome style={{color: '#d9534f'}} name='exclamation-circle' size='3x' />
          <p>警告：未滿十八歲不得觀賞瀏覽</p>
          <p>您是否已經年滿18歲？</p>
          <span className={css(styles.btn)} onClick={this.close}>是</span>
          <Link className={css(styles.btn)} to='/'>否</Link>
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
    backgroundColor: '#A8A8A8',
    border: 0,
    borderRadius: 5,
    color: '#ffffff',
    cursor: 'pointer',
    margin: '0 10px',
    textDecoration: 'none',
    padding: '5px 20px',
    ':hover': {
      opacity: 0.6
    }
  },
  dialog: {
    textAlign: 'center',
    position: 'absolute',
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

IsAdult.propTypes = {
  isAdult: PropTypes.bool
};
export default IsAdult;
