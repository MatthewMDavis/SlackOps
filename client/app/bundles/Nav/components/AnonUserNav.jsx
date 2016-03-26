import React, { PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

export default class AnonUserNav extends React.Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onSignup: PropTypes.func.isRequired,
  };

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

  render() {
    return (
    <Nav pullRight>
      <NavItem eventKey={1} href="#" onClick={this.showLoginModal}>Log In</NavItem>
      <NavItem eventKey={2} href="#" onClick={this.showRegistrationModal}>Sign Up</NavItem>
      <NavItem eventKey={3} href="#">Log In with Facebook</NavItem>
    </Nav>
    );
  }
}

