import actionTypes from '../constants/authConstants';
import axios from 'axios';

const conn = axios.create({
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  }
});

export function logout() {
  const submission = conn.delete('/users/logout');
  return {
    type: actionTypes.SUBMIT_LOGOUT,
    payload: submission
  };
}

export function authPending() {
  return {
    type: actionTypes.AUTH_PENDING
  };
}

 export function authSuccess(payload) {
   return {
     type: actionTypes.AUTH_SUCCESS,
     payload
   }
 }

 export function authError(payload) {
   return {
     type: actionTypes.AUTH_ERROR,
     payload
   }
 }

export function authTransmit(url, credentials) {
  return dispatch => {
    dispatch(authPending());
    return (
      conn.post(url, credentials)
      .then(response => dispatch(authSuccess(response)))
      .catch(response => dispatch(authError(response)))
    );
  };
}

export function login(email, password) {
  const credentials = {
    user: {
      email,
      password
    }
  };
  return authTransmit('/users/login', credentials);
}

export function signup(email, username, password, password_confirmation) {
  const credentials = {
    user: {
      email,
      username,
      password,
      password_confirmation
    }
  };
  return authTransmit('/users', credentials)
}

export function showLoginModal() {
  return {
    type: actionTypes.SHOW_LOGIN_MODAL
  };
}

export function hideLoginModal() {
  return {
    type: actionTypes.HIDE_LOGIN_MODAL
  };
}

export function showRegistrationModal() {
  return {
    type: actionTypes.SHOW_REGISTRATION_MODAL
  };
}

export function hideRegistrationModal() {
  return {
    type: actionTypes.HIDE_REGISTRATION_MODAL
  };
}

export function FBOauthCallback(FBresponse) {
  if (FBresponse.status === 'connected') {
    return dispatch => {
        conn.get('/users/auth/facebook/callback', {})
        .then(response => dispatch(authSuccess(response)))
        .catch(response => dispatch(authError(response)))
    }
  } else if (FBresponse.status === 'not_authorized') {
    alert('You need to authorize to sign in with facebook');
  } else {
    console.log('not logged into facebook');
  }
}

/*
 * export function facebookLogin() {
 *   FB.login(function(response) {
 *     FBOauthCallback(response);
 *   }, {scope: 'email'});
 * }
 */


