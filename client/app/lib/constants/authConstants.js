// See https://www.npmjs.com/package/mirror-creator
// Allows us to set up constants in a slightly more concise syntax.

import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'LOGIN_PENDING',
  'REGISTRATION_PENDING',
  'SUBMIT_REGISTRATION',
  'LOGIN_SUCCESS',
  'REGISTRATION_SUCCESS',
  'LOGIN_ERROR',
  'REGISTRATION_ERROR',
  'SUBMIT_LOGOUT',
  'SHOW_LOGIN_MODAL',
  'SHOW_REGISTRATION_MODAL',
  'HIDE_LOGIN_MODAL',
  'HIDE_REGISTRATION_MODAL'
]);

export default actionTypes;
