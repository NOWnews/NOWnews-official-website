import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';

const renderField = ({ input, label, meta, ...opts }) => (
  // opts like type, placeholder
  <div>
    <label className={css(styles.label)}>{label}</label>
    <input className={css(styles.input)} {...input} {...opts} />
  </div>
);

export const Input = ({ ...input }) => {
  return (
    <Field {...input} component={renderField} />
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#999999',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20
  },
  input: {
    background: '#ebebeb',
    border: 0,
    borderRadius: 5,
    fontSize: 15,
    margin: 8,
    marginBottom: 15,
    outline: 'none',
    padding: 15,
    width: '100%',
    '::placeholder': {
      color: 'black',
      fontWeight: 500
    }
  }
});

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  opts: PropTypes.object
};

export default Input;
