import React from 'react';
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
  return (
    <div id="comment-form">
      <h4>Your Comment</h4>
      <form>
      <textarea className="form-control" rows="10" ref="description"></textarea>
      <br/>
      <button className="btn btn-primary pull-right" onClick={this.handleSubmit}>Submit</button>
      <br />
      Posting as {this.props.user.username}. Logout.
    </form>
    </div>
  );
  }
}
