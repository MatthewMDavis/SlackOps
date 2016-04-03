import React from 'react';
import marked from 'marked';

export default (props) => {
  const rawMarkdown = marked(props.comment.body, { gfm: true, sanitize: true })
  return (
    <div id={`comment-${props.comment.id}`} className="comment">
      <div className="comment-body">
        <span dangerouslySetInnerHTML={{__html: rawMarkdown}} />
      </div>
      <div className="comment-byline">
        By <a href={props.comment.commenter_url}>{props.comment.commenter}</a>
        -- {props.comment.timestamp}
      </div>
    </div>
  );
}

