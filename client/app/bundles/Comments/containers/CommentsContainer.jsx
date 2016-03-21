import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as commentsActionCreators from '../actions/commentsActionCreators';
import * as authActionCreators from 'lib/actions/authActionCreators';
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm';
import CommentLoginPrompt from '../components/CommentLoginPrompt';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  // Note the use of `$$` to prefix the property name because the value is of type Immutable.js
  return (
    { $$commentsStore: state.$$commentsStore,
      $$authStore: state.$$authStore}
  );
}

// Simple example of a React "smart" component
class CommentsContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$commentsStore: PropTypes.instanceOf(Immutable.Map).isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map)
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$commentsStore, $$authStore } = this.props;
    const commentActions = bindActionCreators(commentsActionCreators, dispatch);
    const { updateComments } = commentActions;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { logout, showLoginModal, showRegistrationModal, showFBLogin } = authActions;
    const comments = $$commentsStore.getIn(['$$comments']).toJS();
    const article = $$commentsStore.get('$$article');
    const $$user = $$authStore.get('$$user', null);

    let ContextForm = $$user ?
      <CommentForm $$user={$$user} article={article} onComment={updateComments} onLogout={logout} />
        :
      <CommentLoginPrompt onLogin={showLoginModal} onSignup={showRegistrationModal} onFBLogin={showFBLogin} />
        ;
    return (
      <div className="commentsBox">
        <h3>Comments</h3>
        <CommentsList comments={comments} />
        {ContextForm}
      </div>
    );
  }
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(CommentsContainer);

