import actionTypes from '../constants/commentsConstants';
import axios from 'axios';

const conn = axios.create({
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
});

export function updateComments(body) {
  console.log('text');
  // const url = `/articles/${this.props.article_id}/comments`;
  // const submission = conn.post(url, body);
  // return {
  //   type: actionTypes.COMMENTS_UPDATE,
  //   payload: submission,
  // };
}
