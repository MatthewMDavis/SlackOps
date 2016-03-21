import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
export default class CommentLoginPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.showLoginModal = this.showLoginModal.bind(this);
    this.showRegistrationModal = this.showRegistrationModal.bind(this);
  }

  showLoginModal(e) {
    e.preventDefault();
    this.props.onLogin();
  }

  showRegistrationModal(e) {
    e.preventDefault();
    this.props.onSignup();
  }

  showFBModal(e) {
    e.preventDefault();
    this.props.onFBLogin();
  }

  render() {
    return (
      <div id="comment-login-prompt">
        <h4>Log in or sign up for an account if you would like to leave your own comments.</h4>

        <ButtonGroup>
          <Button onClick={this.showLoginModal}>
            Log in
          </Button>
          <Button onClick={this.showRegistrationModal}>
            Sign up
          </Button>
          <Button onClick={this.showFBModal}>
            Log in with Facebook
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
