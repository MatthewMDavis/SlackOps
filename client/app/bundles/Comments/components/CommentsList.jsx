import React from 'react';
import Comment from '../components/Comment';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'
export default class CommentsList extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const { comments } = this.props;
    const renderComments = comments.map(comment=>{
      return (
              <div key={comment.id} className="comment">
                <Comment comment={comment} />
              </div>
      );
    });
    const CSSTransitionGroup = require('react-addons-css-transition-group')
    return (
      <div className="comments-list">
        <ReactCSSTransitionGroup transitionName="comment" transitionEnterTimeout={1000} transitionLeaveTimeout={300} >
          {renderComments}
        </ReactCSSTransitionGroup>
        <br />
      </div>
    );
  }
}
