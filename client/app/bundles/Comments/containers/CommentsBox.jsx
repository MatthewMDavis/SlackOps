import React from 'react';
import { Button, ButtonInput, ButtonToolbar, Input, Modal } from 'react-bootstrap';
import CommentsList from '../components/CommentsList';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import axios from 'axios';
// import { get, post } from '../../../lib/fetch_helpers';

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
    // this.connect = axios.create(
    //   {
    //     headers: {
    //       'Accept':       'application/json',
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )

  }

  // get(url, options) {
  //   connect = axios.create(
  //     {
  //       headers: {
  //         'Accept':       'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   )
  //   return connect.get(url, options)
  //   .then(response=>{
  //     return response;
  //   })
  //   .catch(err=>{
  //     console.log('There was an error processing your request');
  //     console.log(err);
  //   });
  // }

  // Set up polling for new comments
  componentDidMount() {
    this.interval = setInterval(this.fetchComments, 20 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
      }
    };


    axios.post('/users/login', payload, {
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then(response=> {
      console.log(response.data);
      return response.data;
    })
      .then(data=>{
        this.setState({ user:
                      {id: data.id,
                        url: data.url,
                        username: data.username},
                       showModal: false });
      })
      .catch(ex=>{
        alert(ex);
        console.log(ex);
      });

    // post('/users/login', payload, {})
    // .then(response=> {
    //   window._token = response.headers.get('X-CSRF-Token');
    //   console.log(window._token);
    //   return response.json();
    // })
    //   .then(json=>{
    //     this.setState({ user:
    //                   {id: json.id,
    //                     url: json.url,
    //                     username: json.username},
    //                    showModal: false });
    //   })
    //   .catch(ex=>{
    //     alert(ex);
    //     console.log(ex);
    //   });

  }

  // AJAX comment submission
  commentSubmit(text) {

    const payload = {
      comment: {
        article_id: this.state.article_id,
        user_id: this.state.user.id,
        body: text
      }
    };

    axios.post(
      `/articles/${this.props.article_id}/comments`,
      payload,
      { headers:
        {
          'Accept':       'application/json',
          'Content-Type': 'application/json'
        }
      })
    .then(response=>{
      this.setState({ comments: response.data })
    });
  }

  fetchComments() {
    axios.get(`/articles/${this.props.article_id}/comments`,
              { headers:
                {
                  'Accept':       'application/json',
                  'Content-Type': 'application/json'
                }
              }
             )
             .then(response=>{
               this.setState({ comments: response.data })
             });
  }



  render() {

    let { comments, user } = this.state;
    let ContextForm = user ?
      <CommentForm user={this.state.user} onComment={this.commentSubmit}/>
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
