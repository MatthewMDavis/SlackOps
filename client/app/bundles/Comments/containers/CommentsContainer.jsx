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

  componentDidMount() {
    // polls the server every 20 secs for updates to the comments list
    const { dispatch, $$commentsStore } = this.props;
    const commentActions = bindActionCreators(commentsActionCreators, dispatch);
    const { fetchComments } = commentActions;
    const  article_id  = $$commentsStore.getIn(['$$article', 'article_id']);
    this.interval = setInterval(() => fetchComments(article_id), 20 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillUpdate() {
    this.xpos = window.scrollX;
    this.ypos = window.scrollY;
  }

  componentDidUpdate() {
    window.scrollTo(this.xpos, this.ypos);
  }

  render() {
    const { dispatch, $$commentsStore, $$authStore } = this.props;
    const commentActions = bindActionCreators(commentsActionCreators, dispatch);
    const { submitComment, deleteComment, userCommentChange } = commentActions;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { logout } = authActions;
    const comments = $$commentsStore.getIn(['$$comments']).toJS();
    const { article_id, author } = $$commentsStore.getIn(['$$article']).toJS();
    const currentCommentText = $$commentsStore.get('$$userComment');
    const commentPending = $$commentsStore.get('$$commentPending');
    const commentError = $$commentsStore.get('$$commentError', null);
    const $$user = $$authStore.get('$$user', null);

    let ContextForm = $$user ?
      // if there's a user, loads the form for comments
      <CommentForm $$user={$$user}
        article={article_id}
        currentCommentText={currentCommentText}
        userCommentChange={userCommentChange}
        onComment={submitComment}
        onLogout={logout}
      />
        :
      //if there's no user, loads button bar with login/registration options
      <CommentAuthPrompt />
        ;

    return (
      <div className="commentsBox">
        <h3>Comments</h3>
        <CommentsList
          comments={comments}
          $$user={$$user}
          article={article_id}
          articleAuthor={author}
          deleteCallback={deleteComment}
        />
        <CommentPreview
          currentCommentText={currentCommentText}
          commentPending={commentPending}
          commentError={commentError}
        />
        {ContextForm}
      </div>
    );
  }
}

export default connect(select)(CommentsContainer);

