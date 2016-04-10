import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import { userMayDelete, commentIsFresh } from 'lib/components/policies';

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    articleAuthor: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  deleteLink(user, comment, articleAuthor) {
    if (userMayDelete(user, comment, articleAuthor)) {
      return (<a href="#">Delete comment</a>);
    }
  }

  render() {
  const { user, comment, articleAuthor } = this.props;
  const rawMarkdown = marked(comment.body, { gfm: true, sanitize: true })
  return (
    <div id={`comment-${comment.id}`} className="comment">
      <div className="comment-body">
        <span dangerouslySetInnerHTML={{__html: rawMarkdown}} />
      </div>
      <div className="comment-byline">
        By <a href={comment.commenter_url}>{comment.commenter}</a>
        -- {comment.display_date} {this.deleteLink(user, comment, articleAuthor)}
      </div>
    </div>
  );
  }
}
