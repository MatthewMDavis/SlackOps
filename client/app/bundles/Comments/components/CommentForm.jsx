import React from 'react';
import axios from 'axios';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
handleSubmit(e) {
  e.preventDefault();
  this.props.onComment(this.refs.description.value);
  this.refs.description.value = '';
}

logOut() {
  axios.delete('/users/logout', {
               headers: {
                 'X-CSRF-Token':  window._token,
                 'Accept':       'application/json',
                 'Content-Type': 'application/json'
               }
               },
              );
}
  render() {
  return (
    <div id="comment-form">
      <h4>Your Comment</h4>
      <form>
        <textarea className="form-control" rows="10" ref="description"></textarea>
        <br/>
        <button className="btn btn-primary pull-right" onClick={this.handleSubmit}>Submit</button>
        <br />
        Posting as {this.props.user.username}.<button className="btn btn-link" onClick={this.logOut()}>Logout</button>
      </form>
    </div>
  );
  }
}
