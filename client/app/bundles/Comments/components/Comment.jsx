import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import moment from 'moment';
import { userMayDelete, commentIsFresh } from 'lib/components/policies';

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    user: PropTypes.object,
    article: PropTypes.number.isRequired,
    articleAuthor: PropTypes.string.isRequired,
    deleteCallback: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.deleteLink = this.deleteLink.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { article, comment, deleteCallback } = this.props;
    return ;
  }

  deleteLink() {
    const { user, comment, article, articleAuthor, deleteCallback } = this.props;

    /*
     * standard users have 5 minutes to delete their own comment (cooling
     * off period); the article's author or site admins may delete at all times
     */
    if (userMayDelete(user, comment, articleAuthor)) {

      const exp = moment(comment.timestamp).add(5, 'minutes')
                      .format('HH:mm');
      let linkText = user.role === 'user' ? `Delete (until ${exp})` : 'Delete';

      return (
        <a href="#" onClick={() =>  deleteCallback(article, comment) }>
          {linkText}
        </a>
      );
    }
  }

  render() {
    const { comment } = this.props;
    const rawMarkdown = marked(comment.body, { gfm: true, sanitize: true })
    const displayDate = moment(comment.timestamp).format("MMM Do, Y HH:mm")

    return (
      <div id={`comment-${comment.id}`} className="comment">
        <div className="comment-body">
          <span dangerouslySetInnerHTML={{__html: rawMarkdown}} />
        </div>
        <div className="comment-byline">
          By <a href={comment.commenter_url}>
            {comment.commenter}
          </a>&nbsp;
              {displayDate} {this.deleteLink(...this.props)}
        </div>
      </div>
    );
  }
}
