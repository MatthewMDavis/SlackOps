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

  constructor(props, context) {
    super(props, context);
  }


  componentDidMount() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1609870452669846',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

    /*
     * window.fbAsyncInit = function() {
     *   FB.init({
     *     appId      : '903361249755734',
     *     cookie: true,
     *     xfbml      : true,
     *     version    : 'v2.1'
     *   });
     * }
     */
  }

  componentWillMount() {
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render(){
    const { dispatch, $$authStore } = this.props;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { login, signup, hideLoginModal, hideRegistrationModal } = authActions;
    const loginDisplayState = $$authStore.get('$$showLoginModal');
    const signupDisplayState = $$authStore.get('$$showRegistrationModal');
    const authErrorState = $$authStore.get('$$authError');
    const authPendingState = $$authStore.get('$$authPending');

    return (
      <div>
        <LoginModal show={loginDisplayState} onHide={hideLoginModal} error={authErrorState} onLogin={login} authPending={authPendingState}/>
        <SignupModal show={signupDisplayState} onHide={hideRegistrationModal} error={authErrorState} onSignup={signup} authPending={authPendingState} />
      </div>
    );
  }
}

export default connect(select)(AuthContainer);
