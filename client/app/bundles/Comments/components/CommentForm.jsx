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
    const commentForm = this.props.user ?
    <div>
      <h4>Your Comment</h4>
      <textarea className="form-control" rows="10" ref="description"></textarea>
      <br/>
      <button className="btn btn-primary pull-right" onClick={this.handleSubmit}>Submit</button>
      <br />
    </div>
    :
    <h4>Please login to comment on this article</h4>;

  return (
    <div id="comment-form">
      {commentForm}
    </div>
  );
  }
}
