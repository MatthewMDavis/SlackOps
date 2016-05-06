import React, { Component } from 'react';
import Comment from '../components/Comment';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
import Immutable from 'immutable';

export default class CommentsList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUpdate() {
    this.xpos = window.scrollX;
    this.ypos = window.scrollY;
  }

  componentDidUpdate() {
    window.scrollTo(this.xpos, this.ypos);
  }


  render() {
    const {
      comments,
      $$user,
      article,
      articleAuthor,
      deleteCallback } = this.props;

    const user = $$user ? $$user.toJS() : null;
    const CSSTransitionGroup = require('react-addons-css-transition-group')
    return (
      <div id="comments-list">
        <ReactCSSTransitionGroup
          transitionName="comment"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={300} >
          {comments.map(comment => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                user={user}
                article={article}
                articleAuthor={articleAuthor}
                deleteCallback={deleteCallback}
              />
            );
          }
        )}
       </ReactCSSTransitionGroup>
       <a name="list-end" />
      </div>
    );
  }
}

// export default ({ comments, $$user, article, articleAuthor, deleteCallback }) => {
  // const user = $$user ? $$user.toJS() : null;
  // const CSSTransitionGroup = require('react-addons-css-transition-group')
  // return (
    // <div id="comments-list">
      // <ReactCSSTransitionGroup
        // transitionName="comment"
        // transitionEnterTimeout={1000}
        // transitionLeaveTimeout={300} >
        // {comments.map(comment => {
          // return (
                  // <Comment
                    // key={comment.id}
                    // comment={comment}
                    // user={user}
                    // article={article}
                    // articleAuthor={articleAuthor}
                    // deleteCallback={deleteCallback}
                  // />
                 // );
          // }
         // )}
      // </ReactCSSTransitionGroup>
    // </div>
  // );
// }
