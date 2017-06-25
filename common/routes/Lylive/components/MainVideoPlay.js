import React, { PureComponent, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Container } from '../../../components/Layout';
class MainVideoPlay extends PureComponent {
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
