import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as authActionCreators from 'lib/actions/authActionCreators';
import { Button, ButtonGroup } from 'react-bootstrap';

function select(state) {
  return (
    { $$authStore: state.$$authStore }
  );
}

class CommentAuthPrompt extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }


  startFBLogin() {
    FB.login(response => {
      if(response.authResponse) {
        this.props.onFBLogin(response);
      }
    }, {scope: 'email', state: 'tortured' });
  }

render() {
  const { dispatch, $$authStore } = this.props;
  const authActions = bindActionCreators(authActionCreators, dispatch);
  const { logout, showLoginModal, showRegistrationModal, facebookLogin, FBOauthCallback } = authActions;

  // const startFBLogin = function() {
    // FB.login(response => {FBOauthCallback(response)}, {scope: 'email'});
  // }
  const startFBLogin = function () {
    FB.login(response => {
      if(response.authResponse) {
        FBOauthCallback(response);
      }
    }, {scope: 'email'});
  }
  return (
    <div id="comment-login-prompt">
      <h4>Log in or sign up for an account if you would like to leave your own comments.</h4>

      <ButtonGroup>
        <Button onClick={showLoginModal}>
          Log in
        </Button>
        <Button onClick={showRegistrationModal}>
          Sign up
        </Button>
        <Button	onClick={startFBLogin}>
          Log in with Facebook
        </Button>
      </ButtonGroup>
    </div>
  );
}
}

export default connect(select)(CommentAuthPrompt);
