import actionTypes from '../constants/commentsConstants';
import axios from 'axios';

const conn = axios.create({
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
});

export function updateComments(article_id, user_id, body) {
  const url = `/articles/${article_id}/comments`;
  const contents = {
    comment: {
      article_id: article_id,
      user_id: user_id,
      body: body
    }
  };
  const submission = conn.post(url, contents);
  return {
    type: actionTypes.COMMENTS_UPDATE,
    payload: submission,
  };
}
