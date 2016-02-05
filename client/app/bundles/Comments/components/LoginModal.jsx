import React from 'react';
import { get, post, getHeaders } from '../../../lib/fetch_helpers';
import { Button, Modal } from 'react-bootstrap';

export default class LoginModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false, login_data: {} };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.getLogData = this.getLogData.bind(this);
  }

  componentDidMount() {
    this.getLogData();
  }

  getLogData() {
    getHeaders('/users/login')
    .then(response => {
      const authToken = response.headers.get('x-csrf-token');
      this.setState({login_data: authToken});
      // console.log(this.state.login_data);
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    var display_data = this.state.login_data;
    return (
      <div>
        <h4>Log In if you would like to leave your own comments.</h4>

        <Button
          bsStyle="link"
          onClick={this.open}
        >
        Log in
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form Here</h4>
            <p>{display_data}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

