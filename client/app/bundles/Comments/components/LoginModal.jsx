import React from 'react';
import { get, post, getHeaders } from '../../../lib/fetch_helpers';
import { Button, ButtonInput, ButtonToolbar, Input, Modal } from 'react-bootstrap';

export default class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.loginSubmit = props.onLogin;
    this.user = props.user;
    this.state = { showModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.getValue();
    let pwd = this.refs.pwd.getValue();
    this.loginSubmit(email, pwd);
  }
  render() {
    return (
      <div>
      <h4>Log In if you would like to leave your own comments.</h4>

        <Button bsStyle="link" onClick={this.open}>
          Log in
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form Here</h4>
            <form>
              <Input type="email" label="Email Address" ref="email" placeholder="Enter email" />
              <Input type="password" label="Password" ref="pwd" />
              <ButtonInput type="submit" value="Login" bsStyle="primary" onClick={this.handleSubmit} />
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

