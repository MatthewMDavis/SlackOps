import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import * as commentsActionCreators from '../actions/commentsActionCreators';
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm';

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
    const actions = bindActionCreators(commentsActionCreators, dispatch);
    const { updateComments } = actions;
    const comments = $$commentsStore.get('$$comments').toJS();
    const article = $$commentsStore.get('$$article');
    const user = $$authStore.get('$$user').toJS();

    let ContextForm = user ?
      <CommentForm user={user} onComment={updateComments} article={article}/>
        :
          <div>
            <h4>Log in or sign up for an account if you would like to leave your own comments.</h4>

            <ButtonGroup>
              <Button onClick={(e)=>{console.log(e)}}>
                Log in
              </Button>
              <Button onClick={(e)=>{console.log(e)}}>
                Sign up
              </Button>
              <Button onClick={(e)=>{console.log(e)}}>
                Log in with Facebook
              </Button>
            </ButtonGroup>
          </div>
        ;
    return (
      <div className="commentsBox">
        <h3>Comments</h3>
        <CommentsList comments={comments} onComment={updateComments} />
        {ContextForm}
      </div>
    );
  }
}

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(CommentsContainer);

