import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
export default () => {
  return (
    <div id="comment-login-prompt">
      <h4>Log in or sign up for an account if you would like to leave your own comments.</h4>

      <ButtonGroup>
        <Button onClick={(e)=>{console.log(e)}}>
          Log in
        </Button>
        <Button onClick={(e)=>{console.log(e)}}>
          Sign up
        </Button>
        <Button onClick={(e)=>{console.log(e)}}>
          Log in with Facebook
        </Button>
      </ButtonGroup>
      </div>
  );
}
