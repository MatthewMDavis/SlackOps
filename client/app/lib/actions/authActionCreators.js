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

export function loginPending() {
  return {
    type: actionTypes.LOGIN_PENDING
  };
}

 export function loginSuccess(payload) {
   return {
     type: actionTypes.LOGIN_SUCCESS,
     payload
   }
 }

 export function loginError(payload) {
   return {
     type: actionTypes.LOGIN_ERROR,
     payload
   }
 }

export function xhrLogin(email, password) {
    const credentials = {
      user: {
        email,
        password
      }
    };
    return conn.post('/users/login', credentials);
}

export function login(email, password) {
  return dispatch => {
    dispatch(loginPending());
    return (
      xhrLogin(email, password)
      .then(response => dispatch(loginSuccess(response)))
      .catch(response => dispatch(loginError(response)))
    );
  };
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
  const submission = conn.post('/users', credentials);
  return {
    type: actionTypes.SUBMIT_REGISTRATION,
    payload: submission
  };
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
