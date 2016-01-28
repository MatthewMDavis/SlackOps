import React from 'react';
import CommentsList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';
import LoginForm from '../components/LoginForm';

export default class CommentsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments, user, article_id } = this.props;
    this.fetchComments = this.fetchComments.bind(this)
    this.commentSubmit = this.commentSubmit.bind(this)
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
    const { comments, user } = this.state;
    return (
      <div className="commentsBox">
        <h3>Comments</h3>
        <CommentsList comments={comments} />
        <CommentForm user={user} onComment={this.commentSubmit}/>
        <LoginForm user={user} onLogin={this.loginSubmit} />
      </div>
    );
  }

}
