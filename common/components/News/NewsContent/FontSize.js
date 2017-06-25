import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Margin10 } from '../../../components/Layout';
import StaticContainer from 'react-static-container';

class FontSize extends Component {
  constructor (props) {
    super(props);
    this.changeToBig = this.changeToBig.bind(this);
    this.changeToMiddle = this.changeToMiddle.bind(this);
    this.changeToSmall = this.changeToSmall.bind(this);
  }

  changeToBig () {
    this.props.changeFontSize(24);
  }

  changeToMiddle () {
    this.props.changeFontSize(20);
  }

  changeToSmall () {
    this.props.changeFontSize(16);
  }

  render () {
    return (
      <StaticContainer>
        <Margin10>
          <hr className={css(styles.dottedLine)} />
          <button className={css(styles.btn)} onClick={this.changeToBig}>大</button>
          <button className={css(styles.btn)} onClick={this.changeToMiddle}>中</button>
          <button className={css(styles.btn)} onClick={this.changeToSmall}>小</button>
        </Margin10>
      </StaticContainer>
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

