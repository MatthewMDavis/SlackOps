import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as commentsActionCreators from '../actions/commentsActionCreators';
import * as authActionCreators from 'lib/actions/authActionCreators';
import CommentsList from '../components/CommentsList';
import CommentPreview from '../components/CommentPreview';
import CommentForm from '../components/CommentForm';
import CommentAuthPrompt from '../containers/CommentAuthPrompt';

function select(state) {
  // `$$` to prefix the property name because the value is of type Immutable.js
  return (
    { $$commentsStore: state.$$commentsStore,
      $$authStore: state.$$authStore}
  );
}

class CommentsContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$commentsStore: PropTypes.instanceOf(Immutable.Map).isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$commentsStore, $$authStore } = this.props;
    const commentActions = bindActionCreators(commentsActionCreators, dispatch);
    const { updateComments, userCommentChange } = commentActions;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { logout } = authActions;
    const comments = $$commentsStore.getIn(['$$comments']).toJS();
    const { article_id, author } = $$commentsStore.getIn(['$$article']).toJS();
    const currentCommentText = $$commentsStore.get('$$userComment');
    const commentPending = $$commentsStore.get('$$commentPending');
    const commentError = $$commentsStore.get('$$commentError', null);
    const $$user = $$authStore.get('$$user', null);

    let ContextForm = $$user ?
      <CommentForm $$user={$$user}
        article={article_id}
        currentCommentText={currentCommentText}
        userCommentChange={userCommentChange}
        onComment={updateComments}
        onLogout={logout} />
        :
      <CommentAuthPrompt />
        ;

    return (
      <div className="commentsBox">
        <h3>Comments</h3>
        <CommentsList comments={comments} />
        <CommentPreview currentCommentText={currentCommentText} commentPending={commentPending} commentError={commentError}/>
        {ContextForm}
      </div>
    );
  }
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(CommentsContainer);

