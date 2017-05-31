import React from 'react';
import { Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';

const renderField = ({ ...input }) => (
  <input className={css(styles.input)} {...input} />
);

export const Input = ({ ...input }) => {
  return (
    <Field {...input} component={renderField} />
  );
};

const styles = StyleSheet.create({
  input: {
    background: '#ebebeb',
    border: 0,
    borderRadius: 5,
    fontSize: 15,
    margin: 8,
    outline: 'none',
    padding: 15,
    width: '100%',
    '::placeholder': {
      color: 'black',
      fontWeight: 500
    }
  }
});

export default Input;
