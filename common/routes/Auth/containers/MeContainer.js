import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoRow } from '../../../components/Header';
import { Container } from '../../../components/Layout';
import { Button } from '../../../components/Form';
import { reduxForm } from 'redux-form';
import { StyleSheet, css } from 'aphrodite/no-important';
import Link from 'react-router/lib/Link';
import { UserForm } from '../components';
import { selectUser } from '../../../modules/sourceRequest';
import { onUpdate, onLogout, selectAuthForm, selectAuthPage } from '../module';

const mapStateToProps = state => ({
  authPage: selectAuthPage(state),
  authForm: selectAuthForm(state),
  initialValues: selectUser(state)
});

const mapDispatchToProps = bindActionCreators.bind(null, {
  onLogout,
  onUpdate
});

const MePage = ({ authForm, authPage, initialValues, onLogout, onUpdate }) => {
  return (
    <Container>
      <LogoRow user={initialValues.name} />
      <div className={css(styles.box)}>
        <div className={css(styles.leftSide)}>
          <span className='h1'>Terry Sun</span>
          <hr className={css(styles.dottedLine)} />
          <div className={css(styles.item, styles.active)}>會員設定</div>
          <div className={css(styles.item)} onClick={onLogout}>登出</div>

          <hr className={css(styles.dottedLine)} />
          <Link className={css(styles.backToHome)} to='/'>回首頁</Link>
        </div>
        <div className={css(styles.rightSide)}>
          <UserForm />
          <div className={css(styles.submitBox)}>
            <Button text='儲存' type='submit' handleSubmit={onUpdate} />
          </div>
        </div>
      </div>
    </Container>
  );
};

const primaryColor = '#1886FB';
const styles = StyleSheet.create({
  box: {
    clear: 'both',
    marginTop: 50
  },
  active: {
    color: primaryColor
  },
  backToHome: {
    background: primaryColor,
    textDecoration: 'none',
    border: 0,
    borderRadius: 5,
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10,
    outline: 'none',
    padding: '6.5px 40px'
  },
  dottedLine: {
    border: '1px #727374 dashed',
    margin: '20px 0'
  },
  item: {
    cursor: 'pointer',
    marginLeft: 10,
    marginTop: 10,
    ':hover': {
      opacity: 0.6
    }
  },
  leftSide: {
    float: 'left',
    marginRight: 50,
    width: 250
  },
  rightSide: {
    float: 'left',
    marginLeft: 10,
    position: 'relative',
    width: 500
  },
  submitBox: {
    textAlign: 'right',
    display: 'inline-block',
    position: 'absolute',
    right: 0,
    top: '86.5%',
    width: '50%'
  }
});

MePage.propTypes = {
  authPage: PropTypes.object,
  authForm: PropTypes.object,
  initialValues: PropTypes.object,
  onLogout: PropTypes.func,
  onUpdate: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'auth'})(MePage));
