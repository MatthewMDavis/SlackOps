import actionTypes from '../constants/commentsConstants';
import axios from 'axios';

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

export function fetchingComments() {
  return {
    type: actionTypes.FETCHING_COMMENTS
  };
}

 export function commentDeletePending() {
  return {
    type: actionTypes.COMMENT_DELETE_PENDING
  };
 }

 export function commentSuccess(payload) {
   return {
     type: actionTypes.COMMENT_SUCCESS,
     payload
   }
 }

 export function updateComments(payload) {
   return {
     type: actionTypes.UPDATE_COMMENTS,
     payload
   }
 }

 export function commentError(payload) {
   return {
     type: actionTypes.COMMENT_ERROR,
     payload
   }
 }

export function submitComment(article_id, user_id, body) {
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
    return (
      conn.post(url, contents)
      .then(response => dispatch(commentSuccess(response)))
      .catch(response => dispatch(commentError(response)))
    );
  };
}

export function fetchComments(article_id) {
  const url = `/articles/${article_id}/comments`;
  return dispatch => {
    dispatch(fetchingComments());
    return (
      conn.get(url)
      .then(response => dispatch(updateComments(response)))
      .catch(response => dispatch(commentError(response)))
    );
  };
}

export function deleteComment(article_id, comment) {
  const url = `/articles/${article_id}/comments/${comment.id}`;
  return dispatch => {
    dispatch(commentPending());
    return (
      conn.delete(url)
      .then(response => dispatch(commentSuccess(response)))
      .catch(response => dispatch(commentError(response)))
    );
  };
}



export function userCommentChange(text) {
  return {
    type: actionTypes.USER_COMMENT_CHANGE,
    payload: text
  }
}
