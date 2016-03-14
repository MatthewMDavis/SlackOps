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
