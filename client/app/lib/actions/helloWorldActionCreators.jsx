import actionTypes from '../constants/commentsConstants';
import axios from 'axios';

const conn = axios.create({
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
});

export function updateComments(body) {
  const submission = conn.post(url, body);
  url = `/articles/${this.props.article_id}/comments`;
  return {
    type: actionTypes.COMMENTS_UPDATE,
    submission,
  };
}
