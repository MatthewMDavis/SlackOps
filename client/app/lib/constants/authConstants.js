// See https://www.npmjs.com/package/mirror-creator
// Allows us to set up constants in a slightly more concise syntax.

import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'AUTH_PENDING',
  'AUTH_SUCCESS',
  'AUTH_ERROR',
  'SUBMIT_FB_LOGIN',
  'SUBMIT_LOGOUT',
  'SHOW_LOGIN_MODAL',
  'SHOW_REGISTRATION_MODAL',
  'HIDE_LOGIN_MODAL',
  'HIDE_REGISTRATION_MODAL'
]);

export default actionTypes;
