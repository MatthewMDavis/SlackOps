import React, { Component } from 'react';
import { Input, Modal, ButtonInput } from 'react-bootstrap';


export default class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.getValue();
    let username = this.refs.username.getValue();
    let pwd = this.refs.pwd.getValue();
    let pwdConf = this.refs.pwdConf.getValue();
    this.props.handleSignupSubmit(email, username, pwd, pwdConf);
  }
  render(){
    return (
      <Modal show={this.props.showSignup} onHide={this.props.closeSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input type="email" label="Email Address" ref="email" placeholder="Hidden from other users" />
            <Input type="text" label="User Name" ref="username" placeholder="Will appear with your posts" />
            <Input type="password" label="Password" ref="pwd" />
            <Input type="password" label="Password confirmation" ref="pwdConf" />
            <ButtonInput value="Login" bsStyle="primary" onClick={this.handleSubmit} />
          </form>
        </Modal.Body>
        </Modal>
    );
  }
}
