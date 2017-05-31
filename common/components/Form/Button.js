import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
export const Button = ({ handleSubmit, text, type = 'submit' }) => {
  return (
    <button className={css(styles.btn)} type={type} onSubmit={handleSubmit}>{text}</button>
  );
};

const styles = StyleSheet.create({
  btn: {
    background: '#1886FB',
    border: 0,
    borderRadius: 5,
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10,
    outline: 'none',
    padding: '6.5px 40px'
  }
});

Button.propTypes = {
  handleSubmit: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string
};

export default Button;
