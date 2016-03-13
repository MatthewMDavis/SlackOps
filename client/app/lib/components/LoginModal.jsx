import React, { Component } from 'react';
import { Input, Modal, ButtonInput } from 'react-bootstrap';


export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.getValue();
    let pwd = this.refs.pwd.getValue();
    this.props.handleLoginSubmit(email, pwd);
  }
  render(){
    return (
      <Modal show={this.props.showLogin} onHide={this.props.closeLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input type="email" label="Email Address" ref="email" placeholder="Email" />
            <Input type="password" label="Password" ref="pwd" />
            <ButtonInput value="Login" bsStyle="primary" onClick={this.handleSubmit} />
          </form>
        </Modal.Body>
        </Modal>
    );
  }
}
