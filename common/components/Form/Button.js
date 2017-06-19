import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
export const Button = ({ handleSubmit, isDisable = false, text, type = 'submit' }) => {
  if (isDisable) {
    return (<button className={css(styles.disabledBtn)} disabled type={type}>{text}</button>);
  }

  return (
    <button className={css(styles.activeBtn)} type={type} onClick={handleSubmit}>{text}</button>
  );
};

const btn = {
  border: 0,
  borderRadius: 5,
  color: '#ffffff',
  fontSize: 17,
  fontWeight: 'bold',
  margin: 10,
  outline: 'none',
  padding: '6.5px 40px'
};

const styles = StyleSheet.create({
  activeBtn: {
    ...btn,
    background: '#1886FB',
    cursor: 'pointer',
    ':hover': {
      opacity: 0.6
    }
  },
  disabledBtn: {
    background: '#323334',
    cursor: 'not-allowed',
    ...btn
  }
});

Button.propTypes = {
  handleSubmit: PropTypes.func,
  isDisable: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string
};

export default Button;
