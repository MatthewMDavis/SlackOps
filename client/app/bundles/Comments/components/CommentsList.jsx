import React from 'react';
import Comment from '../components/Comment';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import Immutable from 'immutable';

export default ({ comments, $$user, articleAuthor }) => {
  const user = $$user ? $$user.toJS() : null;
  const CSSTransitionGroup = require('react-addons-css-transition-group')
  return (
    <div id="comments-list">
      <ReactCSSTransitionGroup transitionName="comment" transitionEnterTimeout={1000} transitionLeaveTimeout={300} >
        {comments.map(comment => {
          return <Comment key={comment.id} comment={comment} user={user} articleAuthor={articleAuthor} />;
          }
         )}
      </ReactCSSTransitionGroup>
    </div>
  );
}
