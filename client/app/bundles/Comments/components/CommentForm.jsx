import React from 'react';

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  handleSubmit(e) {
    e.preventDefault();
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
      <div>
        Posting as {this.props.user.username}.
        <button className="btn btn-link" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    </form>
    </div>
  );
  }
}
