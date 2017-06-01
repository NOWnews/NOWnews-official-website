import React from 'react';
import { Input, InputWithLabel } from '../../../components/Form';
import { Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';

const UserForm = () => {
  return (
    <div>
      <InputWithLabel name='name' component='input' type='text' label='姓名' />
      <InputWithLabel name='email' component='input' type='email' label='帳號 / E-mail' />
      <div>
        <label className={css(styles.label)} htmlFor='password'>密碼</label><br />
        <div className={css(styles.pwdBox)}>
          <Input id='password' name='password' component='input' type='password' placeholder='輸入密碼' />
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
  sexBox: {
    marginLeft: 10,
    marginBottom: 15
  }
});

export default UserForm;
