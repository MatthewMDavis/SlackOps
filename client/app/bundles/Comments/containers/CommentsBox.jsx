import React from 'react';
import CommentsList from '../components/CommentsList';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import LoginModal from '../components/LoginModal';
import { get, post } from '../../../lib/fetch_helpers';

export default class CommentsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: props.comments,
                    user: props.user,
                    article_id: props.article_id };
    this.fetchComments = this.fetchComments.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
  }


  componentDidMount() {
    this.interval = setInterval(this.fetchComments, 20 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loginSubmit(email, pwd, csrf_token) {

    const payload = {
      user: {
        id: email,
        password: pwd
      }
    };
    // alert('User email:' + email);
    post('/users/login', payload,
         {headers: {
         'X-CSRF-Token': csrf_token
         }}
        )
      .then(json=>{
        alert(json);
      });

  }
  commentSubmit(text) {

    const payload = {
      comment: {
        article_id: this.state.article_id,
        user_id: this.state.user.id,
        body: text
      }
    };

    post(`/articles/${this.props.article_id}/comments`, payload)
      .then(json=>{
        this.fetchComments();
      });

  }

  fetchComments() {
    get(`/articles/${this.props.article_id}/comments`)
      .then(json=>{
        this.setState({ comments: json });
      });
  }



  render() {
    const ContextualForm = this.state.user ?
      <CommentForm user={user} onComment={this.commentSubmit}/>
      :
      <LoginModal onLogin={this.loginSubmit} />;

    const { comments, user } = this.state;

    return (
      <div className="commentsBox">
        <h3>Comments</h3>
        <CommentsList comments={comments} />
        {ContextualForm}
      </div>
    );
  }

}
