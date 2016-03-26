import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as authActionCreators from 'lib/actions/authActionCreators';

function select(state) {
  // `$$` to prefix the property name because the value is of type Immutable.js
  return (
    {$$authStore: state.$$authStore}
  );
}

class NavContainer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    $$authStore: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, $$authStore } = this.props;
    const authActions = bindActionCreators(authActionCreators, dispatch);
    const { logout } = authActions;
    const article = $$commentsStore.get('$$article');
    const $$user = $$authStore.get('$$user', null);

    let ContextForm = $$user ?
      <CommentForm $$user={$$user} article={article} onComment={updateComments} onLogout={logout} />
        :
      <CommentAuthPrompt />
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

