import React from 'react';
import { InputWithLabel } from '../../../components/Form';
import { Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';

const UserForm = () => {
  return (
    <div>
      <InputWithLabel isRequired name='name' component='input' type='text' label='姓名' />
      <InputWithLabel isRequired name='email' component='input' type='email' label='帳號 / E-mail' disabled />
      {/* <div>
        <label className={css(styles.label)} htmlFor='password'>密碼</label>
        <span className={css(styles.warning)}>*</span>
        <br />
        <div className={css(styles.pwdBox)}>
          <Input id='password' name='password' component='input' type='password' placeholder='輸入密碼' />
        </div>
        <div className={css(styles.pwdBox)}>
          <Input name='confirmPassword' component='input' type='password' placeholder='確認密碼' />
        </div>
      </div> */}
      <InputWithLabel name='phone' component='input' type='text' label='手機' />
      <div>
        <label className={css(styles.label)}>性別</label>
        <div className={css(styles.genderBox)}>
          <label className={css(styles.genderOpts)}><Field name='gender' component='input' type='radio' value='MALE' />男</label>
          <label className={css(styles.genderOpts)}><Field name='gender' component='input' type='radio' value='FEMALE' />女</label>
          <label className={css(styles.genderOpts)}><Field name='gender' component='input' type='radio' value='OTHER' />其他</label>
        </div>
      </div>
      <div className={css(styles.birthdayBox)}>
        <InputWithLabel name='birthday' component='input' type='date' label='生日' />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  birthdayBox: {
    display: 'inline-block',
    width: '50%'
  },
  label: {
    color: '#999999',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20
  },
  pwdBox: {
    display: 'inline-block',
    marginBottom: 15,
    marginRight: 20,
    width: '40%'
  },
  genderBox: {
    marginLeft: 10,
    marginBottom: 15
  },
  genderOpts: {
    paddingRight: 10
  },
  warning: {
    color: '#FF3E29',
    fontSize: 12
  }
});

export default UserForm;
