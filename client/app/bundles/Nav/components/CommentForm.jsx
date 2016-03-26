import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import axios from 'axios';

export default class CommentForm extends React.Component {
  static propTypes = {
    onComment: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    $$user: PropTypes.instanceOf(Immutable.Map),
    article: PropTypes.number.isRequired
  }
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
    this.props.onComment(this.props.article, this.props.$$user.get('id'), this.refs.description.value);
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
        Posting as {this.props.$$user.get('username')}.
        <button className="btn btn-link" onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    </form>
    </div>
  );
  }
}
