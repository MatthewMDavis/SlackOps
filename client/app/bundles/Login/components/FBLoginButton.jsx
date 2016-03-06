import React, { Component } from 'react';
import { Button }  from 'react-bootstrap';

export default class FBButton extends Component {
  constructor(props) {
    super(props);
    this.FBLogin = this.props.FBLogin;
  }
  handleFBLogin(e) {
    e.preventDefault();
    this.FBLogin();
  }
  render() {
    return (
      <Button onClick={this.handleFBLogin}>
        Log in with Facebook
      </Button>
    )
  }
}
