import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
    return (this.props.user.role === 'editor' || this.props.user.role === 'admin');
  }

  render() {
    let profileLink, editLink, adminLink;
    if (!this.props.user.provider) {
      profileLink = (<NavItem eventKey={4.2} href="/users/edit">Edit username/pwd</NavItem>);
    }
    if (this.userMayEdit()) {
      editLink = (<NavItem eventKey={4.3} href="/articles/new">Write an article</NavItem>);
    }
    if (this.props.user.role === 'admin') {
      adminLink = (<NavItem eventKey={4.4} href="/users">Manage users</NavItem>)
    }
    return (
      <Nav pullRight>
        {editLink}
        {adminLink}
        {profileLink}
        <NavItem eventKey={4.1} href="#" onClick={this.handleLogout}>Log out</NavItem>
      </Nav>
    );
  }
}

