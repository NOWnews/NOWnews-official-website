import React from 'react';
// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { LogoRow } from '../../../components/Header';
import { Container } from '../../../components/Layout';
// import { Container, Loading, Margin10, NotFound } from '../../../components/Layout';

const mapStateToProps = state => ({
});

const SignupPage = () => {
  return (
    <Container>
      <LogoRow />
      <div>Signup</div>
    </Container>
  );
};

SignupPage.propTypes = {
};

export default connect(mapStateToProps)(SignupPage);
