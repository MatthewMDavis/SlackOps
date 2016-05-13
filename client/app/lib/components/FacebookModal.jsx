import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { Modal } from 'react-bootstrap';
import AuthAlert from './Alert.jsx';

export default class FacebookModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Immutable.Map),
  };

  constructor(props) {
    super(props);
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
          <Modal.Title>Problem with Facebook login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.errorAlert()}
        </Modal.Body>
      </Modal>
    );
  }
}
