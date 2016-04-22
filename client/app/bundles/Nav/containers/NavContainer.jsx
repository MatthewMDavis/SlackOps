import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as authActionCreators from 'lib/actions/authActionCreators';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AnonUserNav from '../components/AnonUserNav'
import AuthenticatedUserNav from '../components/AuthenticatedUserNav'

function select(state) {
  // `$$` to prefix the property name IDs value as type Immutable.js
  return (
    {$$authStore: state.$$authStore}
  );
}

class NavContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$authStore } = this.props;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const {
      logout,
      login,
      signup,
      showLoginModal,
      showRegistrationModal,
      FBOauthCallback } = authActions;
    const $$user = $$authStore.get('$$user', null);
    function authState() {
      if ($$user) {
        return <AuthenticatedUserNav user={$$user.toJS()} onLogout={logout} />;
      }
      else {
        return (
          <AnonUserNav
            onLogin={showLoginModal}
            onSignup={showRegistrationModal}
            onFBLogin={FBOauthCallback}
          />
        );
      }
    }
    return (
      <Navbar fluid staticTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">MMDBlog</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav>
          <NavItem href="/about">About</NavItem>
          <NavItem href="http"
        </Nav>
        <Navbar.Collapse>
          {authState()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(select)(NavContainer);

