import React from 'react';
import { Button, ButtonInput, ButtonGroup, Input, Modal } from 'react-bootstrap';
import CommentsList from '../components/CommentsList';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import SignupModal from '../../Login/components/SignupModal'
import LoginModal from '../../Login/components/LoginModal'
import axios from 'axios';

export default class CommentsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: props.comments,
      user: props.user,
      article_id: props.article_id,
      showSignupModal: false,
      showLoginModal: false
    };

    this.fetchComments = this.fetchComments.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
    this.setState = this.setState.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.closeSignup = this.closeSignup.bind(this);
    this.openSignup = this.openSignup.bind(this);
    this.submitLogout = this.submitLogout.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleFBLogin = this.handleFBLogin.bind(this);
  }

  componentDidMount() {

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '903361249755734',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }


  // handling the modal login window

  openLogin() {
    this.setState({ showLoginModal: true });
  }
  closeLogin() {
    this.setState({ showLoginModal: false });
  }

  openSignup() {
    this.setState({ showSignupModal: true });
  }
  closeSignup() {
    this.setState({ showSignupModal: false });
  }


  submitSignup(email, username, pwd, pwdConf) {
    const payload = {
      user: {
        email: email,
        username: username,
        password: pwd,
        password_confirmation: pwdConf,
      }
    };

    axios.post('/users', payload, {
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response=> {
      return response.data;
    })
    .then(data=>{
      this.setState({ user:
                    {id: data.id,
                      url: data.url,
                      username: data.username},
                      showSignupModal: false });
    })
    .catch(ex=>{
      alert(ex);
      console.log(ex);
    });
  }

  // Process AJAX login
  submitLogin(email, pwd) {

    const payload = {
      user: {
        email: email,
        password: pwd,
        remember_me: 1
      }
    };

    axios.post('/users/login', payload, {
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response=> {
      return response.data;
    })
    .then(data=>{
      this.setState({ user:
                    {id: data.id,
                      url: data.url,
                      username: data.username},
                      showLoginModal: false });
    })
    .catch(ex=>{
      alert(ex);
      console.log(ex);
    });
  }

  // Process Facebook login
  handleFBLogin(e) {
    e.preventDefault();
    alert('clicked');
    FB.login((response) => {
      if (response.authResponse) {
        console.log(response);
        axios.get('/users/auth/facebook/callback', {
          headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(response=> {
          return response.data;
        })
        .then(data=>{
          this.setState({ user:
                        {id: data.id,
                          url: data.url,
                          username: data.username},
                          showLoginModal: false });
        })
        .catch(ex=>{
          alert(ex);
          console.log(ex);
        });
      }
    });
  }

  // AJAX logout
  submitLogout() {
    axios.delete('/users/logout', {
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      if (response.data.success) {
        this.setState({ user: null });
      }
    })
    .catch(ex=>{
      console.log(response.status);
    });
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
      <CommentForm user={this.state.user} onComment={this.commentSubmit} onLogout={this.submitLogout}/>
        :
          <div>
            <h4>Log in or sign up for an account if you would like to leave your own comments.</h4>

            <ButtonGroup>
              <Button onClick={this.openLogin}>
                Log in
              </Button>
              <Button onClick={this.openSignup}>
                Sign up
              </Button>
              <Button onClick={this.handleFBLogin}>
                Log in with Facebook
              </Button>
            </ButtonGroup>
          </div>
        ;


    return (
      <div className="commentsBox">
        <h3>Comments</h3>
        <CommentsList comments={comments} />
        {ContextForm}
        <LoginModal showLogin={this.state.showLoginModal} closeLogin={this.closeLogin} handleLoginSubmit={this.submitLogin}/>
        <SignupModal showSignup={this.state.showSignupModal} closeSignup={this.closeSignup} handleSignupSubmit={this.submitSignup}/>
      </div>
    );
  }

}
