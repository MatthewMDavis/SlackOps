import React from 'react';
import LoginModal from '../components/LoginModal'
export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
handleSubmit() {
  this.props.onComment(this.refs.description.value);
  this.refs.description.value = '';
}
  render() {
    const commentForm = this.props.user ?
    <div>
      <h4>Your Comment</h4>
      <textarea className="form-control" rows="10" ref="description"></textarea>
      <br/>
      <button className="btn btn-primary pull-right" onClick={this.handleSubmit}>Submit</button>
      <br />
      <p>Posting as {this.props.user.username}. Logout.</p>
    </div>
    :
      <div>
        <LoginModal />
      </div>

  return (
    <div id="comment-form">
      {commentForm}
    </div>
  );
  }
}
