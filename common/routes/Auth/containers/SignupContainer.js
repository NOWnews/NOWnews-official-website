import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { LogoRow } from '../../../components/Header';
import { Container } from '../../../components/Layout';
import { Button, SmLinkTo } from '../../../components/Form';
import { reduxForm } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';
import { UserForm } from '../components';

const mapStateToProps = state => ({
});

const SignupPage = ({ handleSubmit }) => {
  return (
    <Container>
      <LogoRow />
      <div className={css(styles.box)}>
        <h1 className='center'>註冊</h1>
        <p className={css(styles.error)}>● 您輸入的密碼錯誤</p>
        <form onSubmit={handleSubmit}>
          <UserForm />
          <div className={css(styles.submitBox)}>
            <div>
              <span className={css(styles.agreeWord)}>註冊即代表同意</span>
              <SmLinkTo url='/info/terms' text='使用者條款' isExternal />
            </div>
            <Button text='登入' />
          </div>
        </form>
      </div>
    </Container>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: '50px auto',
    position: 'relative',
    width: 600
  },
  agreeWord: {
    fontSize: 15,
    marginRight: 10
  },
  error: {
    color: '#FF3E29',
    textAlign: 'center'
  },
  submitBox: {
    textAlign: 'right',
    display: 'inline-block',
    position: 'absolute',
    right: 0,
    top: '86.5%',
    width: '50%'
  }
});

SignupPage.propTypes = {
  handleSubmit: PropTypes.func
};

export default connect(mapStateToProps)(reduxForm({form: 'signup'})(SignupPage));
