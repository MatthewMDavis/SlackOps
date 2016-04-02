import actionTypes from '../constants/commentsConstants';
import axios from 'axios';
import _ from 'lodash';

const conn = axios.create({
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
});

export function commentPending() {
  return {
    type: actionTypes.COMMENT_PENDING
  };
}

 export function commentSuccess(payload) {
   return {
     type: actionTypes.COMMENT_SUCCESS,
     payload
   }
 }

 export function commentError(payload) {
   return {
     type: actionTypes.COMMENT_ERROR,
     payload
   }
 }

export function updateComments(article_id, user_id, body) {
  const url = `/articles/${article_id}/comments`;
  const contents = {
    comment: {
      article_id: article_id,
      user_id: user_id,
      body: body
    }
  };
  return dispatch => {
    dispatch(commentPending());
    _.delay(() => {
    return (
      conn.post(url, contents)
      .then(response => dispatch(commentSuccess(response)))
      .catch(response => dispatch(commentError(response)))
    );
    }, 5000)
  };
}

export function userCommentChange(text) {
  return {
    type: actionTypes.USER_COMMENT_CHANGE,
    payload: text
  }
}
