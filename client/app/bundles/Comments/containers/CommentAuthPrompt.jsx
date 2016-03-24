import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as commentsActionCreators from '../actions/commentsActionCreators';
import * as authActionCreators from 'lib/actions/authActionCreators';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return (
    { $$authStore: state.$$authStore }
  );
}

const conn = axios.create({
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
});


class CommentAuthPrompt extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '903361249755734',
        cookie: true,
        xfbml      : true,
        version    : 'v2.1'
      });
    }.bind(this)
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

  handleClick() {
    FB.login(function(response) {
      if (response.authResponse) {
        this.statusChangeCallback(response);
      }
    }.bind(this));
  }

  statusChangeCallback(FBresponse) {
    const { dispatch } = this.props;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { authSuccess, authError } = authActions;
    if (FBresponse.status === 'connected') {
      conn.get('/users/auth/facebook/callback', {})
          .then(response => authSuccess(response))
          .catch(response => authError(response));
    } else if (FBresponse.status === 'not_authorized') {
      alert('You need to authorize to sign in with facebook');
    } else {
      console.log('not logged into facebook');
    }
  }

render() {
  const { dispatch, $$authStore } = this.props;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { logout, showLoginModal, showRegistrationModal, facebookLogin } = authActions;
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
          <Button 	onClick={this.handleClick.bind(this)}>
            Log in with Facebook
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default connect(select)(CommentAuthPrompt);
