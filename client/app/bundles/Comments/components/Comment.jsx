import React from 'react';
import marked from 'marked';
import userMayDelete from 'lib/components/policies';

export default ({ comment, user, articleAuthor }) => {
  const rawMarkdown = marked(comment.body, { gfm: true, sanitize: true })
  return (
    <div id={`comment-${comment.id}`} className="comment">
      <div className="comment-body">
        <span dangerouslySetInnerHTML={{__html: rawMarkdown}} />
      </div>
      <div className="comment-byline">
        By <a href={comment.commenter_url}>{comment.commenter}</a>
        -- {comment.timestamp} {user ? userMayDelete(user, comment, articleAuthor) : ''}
      </div>
    </div>
  );
}

