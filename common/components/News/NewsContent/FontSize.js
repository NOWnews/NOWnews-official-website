import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';

class FontSize extends Component {
  constructor (props) {
    super(props);
    this.changeFontSize = this.changeFontSize.bind(this);
  }

  changeFontSize (fontSize) {
    this.props.changeFontSize(fontSize);
  }

  render () {
    return (
      <Margin10>
        <hr className={css(styles.dottedLine)} />
        <button className={css(styles.btn)} onClick={() => this.changeFontSize(24)}>大</button>
        <button className={css(styles.btn)} onClick={() => this.changeFontSize(20)}>中</button>
        <button className={css(styles.btn)} onClick={() => this.changeFontSize(16)}>小</button>
      </Margin10>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#F1F2F3',
    border: 0,
    color: '#1886FB',
    fontSize: 23,
    height: 40,
    width: 100,
    ':focus': {
      outline: 0
    },
    ':hover': {
      fontWeight: 'bold'
    }
  },
  dottedLine: {
    border: '1px #727374 dashed'
  }
});

FontSize.propTypes = {
  changeFontSize: PropTypes.func.isRequired
};

export default FontSize;

