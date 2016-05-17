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

 export function fbAuthError(payload) {
   return {
     type: actionTypes.FB_AUTH_ERROR,
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

export function hideFBModal() {
  return {
    type: actionTypes.HIDE_FB_MODAL
  };
}

export function FBOauthCallback(FBresponse) {
  return dispatch => {
    conn.get('/users/auth/facebook/callback', {})
      .then(response => {
          dispatch(authSuccess(response));
      })
      .catch(response => {
        // When FB logs user in, but Devise omniauth callback fails, kill the FB
        // session
      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          FB.logout();
        }
      }, true);

        dispatch(fbAuthError(response));
      });

      // .catch(() => dispatch({
        // type: authError,
        // payload: {
          // data: {
            // error: 'Unable to log in to Slackops'
          // }
        // }
      // }));
  }
}
