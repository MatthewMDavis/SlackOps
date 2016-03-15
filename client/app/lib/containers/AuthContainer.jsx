import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { Input, Modal, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from 'lib/actions/authActionCreators';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';


function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return (
    { $$authStore: state.$$authStore }
  );
}

export default class AuthContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map)
  };

  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   let email = this.refs.email.getValue();
  //   let pwd = this.refs.pwd.getValue();
  //   this.props.handleLoginSubmit(email, pwd);
  // }
  render(){
    const { dispatch, $$authStore } = this.props;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { login, signup, hideLoginModal, hideRegistrationModal } = authActions;
    const loginDisplayState = $$authStore.get('$$showLoginModal');
    const signupDisplayState = $$authStore.get('$$showRegistrationModal');

    return (
      <div>
        <LoginModal show={loginDisplayState} onHide={hideLoginModal} onLogin={login} />
        <SignupModal show={signupDisplayState} onHide={hideRegistrationModal} onSignup={signup} />
      </div>
    );
  }
}

export default connect(select)(AuthContainer);
