import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { LogoRow } from '../../../components/Header';
import { Container, Margin10 } from '../../../components/Layout';
import { StyleSheet, css } from 'aphrodite/no-important';
import { SmLinkTo } from '../../../components/Form';
import { selectLocal } from '../../../modules/sourceRequest';

const mapStateToProps = state => ({
  local: selectLocal(state)
});

const OauthContainer = ({ local, handleSubmit }) => {
  return (
    <Container>
      <LogoRow />
      <div className={css(styles.box)}>
        <h1>會員登入</h1>
        {local.query && local.query.msg && <p className={css(styles.error)}>● {local.query.msg}</p>}
        <Margin10>
          <a href='https://memberapi.nownews.com/api/auth/oauth' className={css(styles.googleBtn)}>
            <img src='/social/btn-google-signin.png' />
          </a>
          <span className={css(styles.agreeWord)}>登入即代表同意</span>
          <SmLinkTo url='/info/terms' text='使用者條款' isExternal />
        </Margin10>
        <Link className={css(styles.backToHome)} to='/'>
          <FontAwesome className={css(styles.backIcon)} size='2x' name='angle-left' />
          回首頁
        </Link>
      </div>
    </Container>
  );
};

const styles = StyleSheet.create({
  agreeWord: {
    fontSize: 15,
    marginRight: 10
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
  box: {
    margin: '50px auto',
    textAlign: 'center',
    width: 300
  },
  error: {
    color: '#FF3E29'
  },
  googleBtn: {
    background: '',
    display: 'block',
    margin: '10px',
    textDecoration: 'none',
    ':hover': {
      opacity: 0.6
    }
  }
});

OauthContainer.propTypes = {
  local: PropTypes.object,
  handleSubmit: PropTypes.func
};

export default connect(mapStateToProps)(OauthContainer);
