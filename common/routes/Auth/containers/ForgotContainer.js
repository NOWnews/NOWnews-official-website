import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { LogoRow } from '../../../components/Header';
import { Container } from '../../../components/Layout';
import { Button, Input } from '../../../components/Form';
import { reduxForm } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';

const mapStateToProps = state => ({
});

const ForgotPage = ({ handleSubmit }) => {
  return (
    <Container>
      <LogoRow />
      <div className={css(styles.box)}>
        <h1>忘記密碼</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <Input name='email' component='input' type='email'
              placeholder='輸入帳號（E-mail）' />
          </div>
          <Button text='送出' />
        </form>
      </div>
    </Container>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: '70px auto',
    textAlign: 'center',
    width: 300
  },
  error: {
    color: '#FF3E29'
  }
});

ForgotPage.propTypes = {
  handleSubmit: PropTypes.func
};

export default connect(mapStateToProps)(reduxForm({form: 'login'})(ForgotPage));
