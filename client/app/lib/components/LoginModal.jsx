import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { Input, Modal, ButtonInput } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActionCreators from 'lib/actions/authActionCreators';


function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return (
    { $$authStore: state.$$authStore }
  );
}

export default class LoginModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map)
  };

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
    const { dispatch, $$authStore } = this.props;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { hideLoginModal } = authActions;
    const displayState = $$authStore.get('$$showLoginModal');
    return (
      <Modal show={displayState} onHide={hideLoginModal}>
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

export default connect(select)(LoginModal);
