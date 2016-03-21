import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { Input, Modal, ButtonInput } from 'react-bootstrap';
import Loader from 'react-loader';
import AuthAlert from './Alert.jsx';

export default class SignupModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSignup: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Immutable.Map),
    authPending: PropTypes.bool
  };
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
    this.props.onSignup(email, username, pwd, pwdConf);
  }


  errorAlert() {
    if (this.props.error){
      return (
        <AuthAlert errorCollection={this.props.error} />
      );
    }
  }


  render(){
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up for an Account</Modal.Title>
        </Modal.Header>
        <span><Loader loaded={!this.props.authPending}>&nbsp;</Loader></span>
        <Modal.Body>
          {this.errorAlert()}
          <form>
            <Input type="email" label="Email Address" ref="email" placeholder="Hidden from other users" />
            <Input type="text" label="User Name" ref="username" placeholder="Will appear with your posts" />
            <Input type="password" label="Password" ref="pwd" />
            <Input type="password" label="Password confirmation" ref="pwdConf" />
            <ButtonInput value="Sign Up" bsStyle="primary" onClick={this.handleSubmit} />
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
