import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { LogoRow } from '../../../components/Header';
import { Container } from '../../../components/Layout';
import { Button, Input, InputWithLabel, SmLinkTo } from '../../../components/Form';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';

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
          <InputWithLabel name='name' component='input' type='text' label='姓名' />
          <InputWithLabel name='email' component='input' type='email' label='帳號 / E-mail' />
          <div>
            <label className={css(styles.label)}>密碼</label><br />
            <div className={css(styles.pwdBox)}>
              <Input name='password' component='input' type='password' placeholder='輸入密碼' />
            </div>
            <div className={css(styles.pwdBox)}>
              <Input name='confirmPassword' component='input' type='password' placeholder='確認密碼' />
            </div>
          </div>
          <InputWithLabel name='phone' component='input' type='text' label='手機' />
          <div>
            <label className={css(styles.label)}>性別</label>
            <div className={css(styles.sexBox)}>
              <label><Field name='sex' component='input' type='radio' value='male' />男</label>
              <label><Field name='sex' component='input' type='radio' value='female' />女</label>
            </div>
          </div>
          <div>
            <div className={css(styles.birthdayBox)}>
              <InputWithLabel name='birthday' component='input' type='date' label='生日' />
            </div>
            <div className={css(styles.submitBox)}>
              <div>
                <span className={css(styles.agreeWord)}>註冊即代表同意</span>
                <SmLinkTo url='/info/member' text='使用者條款' isExternal />
              </div>
              <Button text='登入' />
            </div>
          </div>

        </form>
      </div>
    </Container>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: '70px auto',
    width: 600
  },
  agreeWord: {
    fontSize: 15,
    marginRight: 10
  },
  birthdayBox: {
    display: 'inline-block',
    width: '50%'
  },
  error: {
    color: '#FF3E29',
    textAlign: 'center'
  },
  label: {
    color: '#999999',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20
  },
  pwdBox: {
    display: 'inline-block',
    marginRight: 20,
    width: '40%'
  },
  sexBox: {
    marginLeft: 10,
    marginBottom: 15
  },
  submitBox: {
    textAlign: 'right',
    display: 'inline-block',
    position: 'relative',
    top: 10,
    width: '50%'
  }
});

SignupPage.propTypes = {
  handleSubmit: PropTypes.func
};

export default connect(mapStateToProps)(reduxForm({form: 'signup'})(SignupPage));
