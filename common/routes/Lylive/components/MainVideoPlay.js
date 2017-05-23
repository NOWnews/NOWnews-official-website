import React, { Component, PropTypes } from 'react';
// import FontAwesome from 'react-fontawesome';
// import Link from 'react-router/lib/Link';
import { StyleSheet, css } from 'aphrodite/no-important';
// import { VideoPlayer } from '../../../components/News';
import { Container } from '../../../components/Layout';
// import moment from 'moment';

class MainVideoPlay extends Component {
  // constructor (props) {
  //   super(props);
  // }
  render () {
    return (
      <div className={css(styles.box)}>
        <Container className={css(styles.container)}>
          <iframe width='100%' height='360' src={this.props.url} frameBorder='0' allowFullScreen />
        </Container>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  box: {
    background: '#000000'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0 13rem'
  }
});

MainVideoPlay.propTypes = {
  url: PropTypes.string.isRequired
};
export default MainVideoPlay;
