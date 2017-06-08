import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoRow } from '../../../components/Header';
import { Container } from '../../../components/Layout';
import { Button, SmLinkTo } from '../../../components/Form';
import { reduxForm } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';
import { UserForm } from '../components';
import { onSignup, selectAuthForm, selectAuthPage } from '../module.js';

const mapStateToProps = state => ({
  authPage: selectAuthPage(state),
  authForm: selectAuthForm(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  onSignup
});

const checkPwd = (value) => {
  const regStr = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,16}$/;
  return regStr.test(value);
};

const checkEmail = (value) => {
  const regStr = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;
  return regStr.test(value);
};

const SignupPage = ({ authForm, authPage, onSignup }) => {
  const values = authForm && authForm.values || {}; // 沒輸入值的時候 values 會是 undefined
  const { password = '', confirmPassword = '', name, email } = values;
  let error = (values === {}) ? authPage.error : null;

  if (!checkPwd(password)) {
    error = '密碼格式不正確，請輸入：8 - 16 位英文大小寫、數字混合';
  } else if (password.trim() !== confirmPassword.trim()) {
    error = '兩次輸入密碼的不一致！';
  } else if (!checkEmail(email)) {
    error = '信箱格式不正確！';
  }

  const isDisable = (!name || !email || !!error || password.trim() === '');

  return (
    <Container>
      <LogoRow />
      <div className={css(styles.box)}>
        <h1 className='center'>註冊</h1>
        {error && <p className={css(styles.error)}>● {error}</p>}
        <div>
          <UserForm />
          <div className={css(styles.submitBox)}>
            <div>
              <span className={css(styles.agreeWord)}>註冊即代表同意</span>
              <SmLinkTo url='/info/terms' text='使用者條款' isExternal />
            </div>
            <Button text='登入' type='submit' handleSubmit={onSignup} isDisable={isDisable} />
          </div>
        </div>
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
  authPage: PropTypes.object,
  authForm: PropTypes.object,
  onSignup: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'auth'})(SignupPage));
