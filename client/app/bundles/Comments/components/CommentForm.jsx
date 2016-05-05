import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Input, ButtonInput } from 'react-bootstrap';
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
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComment(this.props.article, this.props.$$user.get('id'),
                         this.refs.description.getValue());
    this.refs.description.value = '';
  }

  handleCommentChange() {
    this.props.userCommentChange(this.refs.description.getValue());
  }

  render() {
    const { currentCommentText } = this.props;

    return (
          <div id="comment-form">
            <h4>Your Comment</h4>
            <form>
              <Input
                type="textarea"
                className="form-control"
                rows="10"
                autoFocus={true}
                help="Accepts Markdown: bold, ital, link, code, ul, ol"
                ref="description"
                value={this.props.currentCommentText}
                onChange={this.handleCommentChange}
              />
              <ButtonInput
                className="btn btn-primary"
                onClick={this.handleSubmit}>
                Submit
              </ButtonInput>
              <div>
                Posting as {this.props.$$user.get('username')}. &nbsp;
                <a href="#" onClick={this.handleLogout} title="Logout">
                  Logout
                </a>
              </div>
            </form>
          </div>
    );
  }
}
