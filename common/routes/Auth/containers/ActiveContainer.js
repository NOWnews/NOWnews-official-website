import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { LogoRow } from '../../../components/Header';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Container, Margin10 } from '../../../components/Layout';
import { activeEmail, resendActiveEmail, selectAuthForm, selectAuthPage } from '../module.js';
import { Button, Input } from '../../../components/Form';
import Link from 'react-router/lib/Link';

const redial = {
  fetch: ({ dispatch, params: { token } }) => Promise.all([
    dispatch(activeEmail(token))
  ])
};

const mapStateToProps = state => ({
  authPage: selectAuthPage(state),
  authForm: selectAuthForm(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  resendActiveEmail
});

const ActivePage = ({ authForm, authPage, resendActiveEmail }) => {
  return (
    <Container>
      <LogoRow />
      <div className={css(styles.box)}>
        <h1>啟動帳號</h1>
        {authPage.error ? <Margin10>
          <p className={css(styles.error)}>驗證發生錯誤：{authPage.error}</p>
          <p className={css(styles.error)}>請輸入信箱重新取得驗證信</p>
          <Input name='email' component='input' type='email' placeholder='輸入帳號（E-mail）' />
          <Button text='送出' type='submit' handleSubmit={resendActiveEmail} />
        </Margin10> : <div>信箱驗證成功網站，請 <Link to='/auth/login'>點我</Link> 登入</div>}
      </div>
    </Container>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: '50px auto',
    textAlign: 'center',
    width: 360
  },
  error: {
    color: '#FF3E29'
  }
});

ActivePage.propTypes = {
  authPage: PropTypes.object,
  authForm: PropTypes.object,
  resendActiveEmail: PropTypes.func
};

export default provideHooks(redial)(connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'auth'})(ActivePage)));
