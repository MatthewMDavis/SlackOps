import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { AutoAffix } from 'react-bootstrap/node_modules/react-overlays';
import Immutable from 'immutable';
import axios from 'axios';

export default class CommentForm extends React.Component {
  static propTypes = {
    onComment: PropTypes.func.isRequired,
    userCommentChange: PropTypes.func.isRequired,
    currentCommentText: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    $$user: PropTypes.instanceOf(Immutable.Map),
    article: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentWillUpdate() {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight - node.offsetHeight
    }
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

  handleCommentChange() {
    this.props.userCommentChange(this.refs.description.value);
  }

  render() {
    const { currentCommentText } = this.props;
    return (
          <div id="comment-form">
            <h4>Your Comment</h4>
            <form>
              <textarea className="form-control" rows="10" ref="description" onChange={this.handleCommentChange}></textarea>
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
