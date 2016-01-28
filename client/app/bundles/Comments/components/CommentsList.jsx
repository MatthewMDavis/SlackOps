import React from 'react';
import Comment from '../components/Comment.jsx';

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

    return (
      <div className="comments-list">
        <React.addons.CSSTransitionGroup transitionName="comment" transitionEnterTimeout={1000} transitionLeaveTimeout={300} >
          {renderComments}
        </React.addons.CSSTransitionGroup>
      </div>
    );
  }
}
