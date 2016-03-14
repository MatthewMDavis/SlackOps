// See https://www.npmjs.com/package/mirror-creator
// Allows us to set up constants in a slightly more concise syntax.

import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'SUBMIT_LOGIN',
  'SUBMIT_REGISTRATION',
  'SUBMIT_LOGOUT',
  'SHOW_LOGIN_MODAL',
  'SHOW_REGISTRATION_MODAL',
  'HIDE_LOGIN_MODAL',
  'HIDE_REGISTRATION_MODAL'
]);

export default actionTypes;
