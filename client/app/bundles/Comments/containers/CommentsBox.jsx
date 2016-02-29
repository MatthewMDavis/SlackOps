import React from 'react';
import { Button, ButtonInput, ButtonToolbar, Input, Modal } from 'react-bootstrap';
import CommentsList from '../components/CommentsList';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import { get, post, destroy } from '../../../lib/fetch_helpers';

export default class CommentsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: props.comments,
      user: props.user,
      article_id: props.article_id,
      showModal: false
    };

    this.fetchComments = this.fetchComments.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
    this.setState = this.setState.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.submitLogout = this.submitLogout.bind(this);

  }

  // Set up polling for new comments
  // componentDidMount() {
  //   this.interval = setInterval(this.fetchComments, 20 * 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

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
    .then(response=>{
      return response.json();
    })
    .then(json=> {
      this.setState({ comments: json });
    });
  }


  // handling the modal login window

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  handleModalSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.getValue();
    let pwd = this.refs.pwd.getValue();
    this.loginSubmit(email, pwd);
  }


  // Process AJAX login
  loginSubmit(email, pwd) {

    const payload = {
      user: {
        email: email,
        password: pwd,
        remember_me: 1
      }
    };

    post('/users/login', payload)
    .then(response=> {
      return response.json();
    })
    .then(json=>{
      this.setState({ user: json, showModal: false })
    })
    .catch(ex=>{
      alert(ex);
      console.log(ex);
    });
  }

  submitLogout() {
    destroy('/users/logout')
    .then(response=> {
      return response.json();
    })
    .then(json=> {
      this.setState({user: json.user});
    })
  }

  render() {

    let { comments, user } = this.state;
    let ContextForm = user ?
      <CommentForm user={this.state.user} onComment={this.commentSubmit} onLogout={this.submitLogout}/>
        :
          <div>
            <h4>Log In if you would like to leave your own comments.</h4>

            <Button bsStyle="link" onClick={this.open}>
              Log in
            </Button>
          </div>
        ;


    return (
      <div className="commentsBox">
        <h3>Comments</h3>
        <CommentsList comments={comments} />
        {ContextForm}
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Form Here</h4>
            <form>
              <Input type="email" label="Email Address" ref="email" placeholder="Enter email" />
              <Input type="password" label="Password" ref="pwd" />
              <ButtonInput value="Login" bsStyle="primary" onClick={this.handleModalSubmit} />
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

}
