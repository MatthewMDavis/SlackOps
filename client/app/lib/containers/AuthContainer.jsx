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


  componentDidMount() {
    const { $$authStore, dispatch } = this.props;
    const curr_user = $$authStore.get('$$user');
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { logout } = authActions;

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1609870452669846',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.6',
        status     : true
      });
      // -- Dev instance
      // FB.init({
        // appId      : '1611095332547358',
        // cookie     : true,
        // xfbml      : true,
        // version    : 'v2.6',
        // status    : true
      // });

      // If Facebook still has a live session, but there is no current user in
      // redux state, we need to clean up.
      FB.Event.subscribe('auth.authResponseChange', response => {
        if (response.authResponse && !curr_user) {
          logout();
        }
      })
    }
  }

  componentWillMount() {
    // Insert the Facebook JS sdk into the page headers
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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
