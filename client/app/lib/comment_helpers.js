import axios from 'axios';

const conn = axios.create({
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
});

export function xhrCommSubmit(url, payload, options) {
    conn.post(url, payload, options)
    .then(response=>{
      this.setState({ comments: response.data })
    });
}

export function xhrCommFetch(url, options) {
  conn.get(url, options)
  .then(response=>{
    this.setState({ comments: response.data })
  });
}
