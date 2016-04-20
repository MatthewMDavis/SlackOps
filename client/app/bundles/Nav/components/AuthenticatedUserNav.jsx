import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class AnonUserNav extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  userMayEdit() {
    return (
      this.props.user.role === 'editor' || this.props.user.role === 'admin'
    );
  }

  render() {
    let profileLink, editLink, adminLink;
    let username = this.props.user.username;
    let email = this.props.user.email;


    if (!this.props.user.provider) {  // So no profileLink for facebook users
      profileLink = (
        <MenuItem eventKey={3.2} href="/users/edit">Edit username/pwd</MenuItem>
      );
    }
    if (this.userMayEdit()) {
      editLink = (
        <NavItem eventKey={1} href="/articles/new">Write an article</NavItem>
      );
    }
    if (this.props.user.role === 'admin') {
      adminLink = (
        <NavItem eventKey={2} href="/users">Manage users</NavItem>
      );
    }
    return (
      <Nav pullRight>
        {editLink}
        {adminLink}
        <NavDropdown
          eventyKey={3}
          title={`Logged in as ${username} (${email}) `}
          id="nav-user-menu">
          {profileLink}
          <MenuItem
            eventKey={4.1}
            href="#"
            onClick={this.handleLogout}>
            Log out
          </MenuItem>
        </NavDropdown>
        <img
          className="hidden-xs hidden-sm"
          src={this.props.user.img}
          alt={this.props.user.username}
        />
      </Nav>
    );
  }
}

