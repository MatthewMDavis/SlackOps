import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import moment from 'moment';
import { userMayDelete, commentIsFresh } from 'lib/components/policies';

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    user: PropTypes.object,
    articleAuthor: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.displayDate = moment(props.comment.timestamp).format("MMM Do, Y HH:mm")
  }

  deleteLink(user, comment, articleAuthor) {

    if (userMayDelete(user, comment, articleAuthor)) {
    // standard users have 5 minutes to delete their own comment (cooling
    // off period); the article's author or site admins may delete at all times

    const expires = moment(comment.timestamp).add(5, 'minutes').format('HH:mm');

      switch (user.role) {
        case 'user':
          return <a href="#">Delete (until {expires})</a>;
        default:
          return <a href="#">Delete</a>;
      }
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
          By <a href={comment.commenter_url}>
            {comment.commenter}
          </a>&nbsp;
              {this.displayDate} {this.deleteLink(user, comment, articleAuthor)}
        </div>
      </div>
    );
  }
}
