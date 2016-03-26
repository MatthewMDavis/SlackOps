import React from 'react';

export default (props) => {
  return (
    <div id={`comment-${props.comment.id}`} className="comment">
      <div className="comment-body">
        <span dangerouslySetInnerHTML={{__html: props.comment.body}} />
      </div>
      <div className="comment-byline">
        By <a href={props.comment.commenter_url}>{props.comment.commenter}</a>
        -- {props.comment.timestamp}
      </div>
    </div>
  );
}

