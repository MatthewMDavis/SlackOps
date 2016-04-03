import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';
import Immutable from 'immutable';
import marked from 'marked';

export default class CommentPreview extends Component {
  static propTypes = {
    currentCommentText: PropTypes.string.isRequired,
    commentPending: PropTypes.bool.isRequired,
    commentError: PropTypes.instanceOf(Immutable.Map)
  }

  constructor(props) {
    super(props);
    // const { commentPending, commentError, currentCommentText } = props;
    this.commentError = props.commentError;
    this.isLoaded = this.isLoaded.bind(this);
  }

  isLoaded() {
    return !(this.commentPending || this.commentError)
  }

  render() {
    let commPreview;
    function buildPreview(item) {
      if (item.props.commentError) {
        return (
          <div className="comment-alert alert-danger">
            There was a problem posting your comment. If you spent a lot of time on it, you might want to copy it so it's safe while you try again:
            {item.props.currentCommentText}
          </div>
        );
      }
      else if (item.props.currentCommentText) {
        const rawMarkdown = marked(item.props.currentCommentText, { gfm: true, sanitize: true })
        return (
          <div className="comment-alert alert-info">
            <span dangerouslySetInnerHTML={{ __html: rawMarkdown }} />
          </div>
        );
      }
    }

    commPreview = buildPreview(this);

    return (
      <div>
        {commPreview}
      </div>
    );
  }
}
