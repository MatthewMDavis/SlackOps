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


  // componentDidMount() {

  //   // initialize the Facebook Oauth2 for the app
  //   window.fbAsyncInit = function() {
  //     FB.init({
  //       appId      : '903361249755734',
  //       cookie     : true,  // enable cookies to allow the server to access
  //                           // the session
  //       xfbml      : true,  // parse social plugins on this page
  //       version    : 'v2.1' // use version 2.1
  //     });
  //   }.bind(this);

  //   // Load the SDK asynchronously
  //   (function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
  // }

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
