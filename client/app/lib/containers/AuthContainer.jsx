import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { Input, Modal, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from 'lib/actions/authActionCreators';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import FacebookModal from '../components/FacebookModal';


function select(state) {
  return (
    { $$authStore: state.$$authStore }
  );
}

export default class AuthContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map)
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$authStore } = this.props;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { login, signup, hideLoginModal, hideRegistrationModal, hideFBModal } = authActions;
    const loginDisplayState = $$authStore.get('$$showLoginModal');
    const signupDisplayState = $$authStore.get('$$showRegistrationModal');
    const facebookDisplayState = $$authStore.get('$$showFBModal');
    const authErrorState = $$authStore.get('$$authError');
    const authPendingState = $$authStore.get('$$authPending');

    return (
      <div>
        <LoginModal show={loginDisplayState} onHide={hideLoginModal} error={authErrorState} onLogin={login} authPending={authPendingState}/>
        <SignupModal show={signupDisplayState} onHide={hideRegistrationModal} error={authErrorState} onSignup={signup} authPending={authPendingState} />
        <FacebookModal show={facebookDisplayState} onHide={hideFBModal} error={authErrorState} />
      </div>
    );
  }
}

export default connect(select)(AuthContainer);
