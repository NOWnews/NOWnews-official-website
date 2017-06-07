import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoRow } from '../../../components/Header';
import { Container } from '../../../components/Layout';
import { Button, Input, SmLinkTo } from '../../../components/Form';
import { reduxForm } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';
import FontAwesome from 'react-fontawesome';
import { onLogin, selectAuthForm, selectAuthPage } from '../module.js';

const mapStateToProps = state => ({
  authPage: selectAuthPage(state),
  authForm: selectAuthForm(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  onLogin
});

const LoginPage = ({ authForm, authPage, onLogin }) => {
  return (
    <Container>
      <LogoRow />
      <div className={css(styles.box)}>
        <h1>會員登入</h1>
        {authPage.error && <p className={css(styles.error)}>● {authPage.error}</p>}
        <div>
          <div>
            <Input name='email' component='input' type='email'
              placeholder='輸入帳號（E-mail）' />
          </div>
          <div>
            <Input name='password' component='input' type='password'
              placeholder='輸入密碼' />
          </div>
          <div className={css(styles.forgotPwdBox)}>
            <SmLinkTo url='/auth/forgot' text='忘記密碼' />
          </div>
          <Button text='登入' type='submit' handleSubmit={onLogin} />
          <p>
            <span className={css(styles.notYetMember)}>還不是會員嗎</span>
            <SmLinkTo url='/auth/signup' text='註冊新帳號' />
          </p>
          <Link className={css(styles.backToHome)} to='/'>
            <FontAwesome className={css(styles.backIcon)} size='2x' name='angle-left' />
            回首頁
          </Link>
        </div>
      </div>
    </Container>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: '50px auto',
    textAlign: 'center',
    width: 300
  },
  backIcon: {
    left: -10,
    position: 'relative',
    top: 6.5
  },
  backToHome: {
    color: '#000000',
    fontWeight: 500,
    fontSize: 22,
    textDecoration: 'none',
    ':hover': {
      opacity: 0.6
    }
  },
  error: {
    color: '#FF3E29'
  },
  forgotPwdBox: {
    height: 50,
    textAlign: 'right'
  },
  notYetMember: {
    color: '#999999',
    marginRight: 10
  }
});

LoginPage.propTypes = {
  authPage: PropTypes.object,
  authForm: PropTypes.object,
  onLogin: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'auth'})(LoginPage));
