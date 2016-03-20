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
    dispatch(authPending());
    return (
      xhrLogin(email, password)
      .then(response =>
            {
              console.log(response);
              dispatch(authSuccess(response));
            }
           )
      .catch(response => dispatch(authError(response)))
    );
  };
}

export function xhrSignup(email, username, password, password_confirmation) {
    const credentials = {
      user: {
        email,
        username,
        password,
        password_confirmation
      }
    };
    return conn.post('/users', credentials);
}

export function signup(email, username, password, password_confirmation) {
  return dispatch => {
    dispatch(authPending());
    return (
      xhrSignup(...arguments)
      .then(response => dispatch(authSuccess(response)))
      .catch(response => dispatch(authError(response)))
    );
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
