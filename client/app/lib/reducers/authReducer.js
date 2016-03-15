import Immutable from 'immutable';

import actionTypes from '../constants/authConstants';

export const $$initialState = Immutable.fromJS({
  $$user: null,
  $$showLoginModal: false,
  $$showRegistrationModal: false
});


export default function commentsReducer($$state = $$initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SUBMIT_REGISTRATION:
      const $$newSignup = Immutable.fromJS(payload.data);
      return $$state.setIn(['$$user'], $$newSignup).set('$$showRegistrationModal', false);

    case actionTypes.SUBMIT_LOGIN:
      const $$newLogin = Immutable.fromJS(payload.data);
      return $$state.setIn(['$$user'], $$newLogin).set('$$showLoginModal', false);

    case actionTypes.SUBMIT_LOGOUT:
      return $$state.set('$$user', null);

    case actionTypes.SHOW_LOGIN_MODAL:
      return $$state.set('$$showLoginModal', true);

    case actionTypes.SHOW_REGISTRATION_MODAL:
      return $$state.set('$$showRegistrationModal', true);

    case actionTypes.HIDE_LOGIN_MODAL:
      return $$state.set('$$showLoginModal', false);

    case actionTypes.HIDE_REGISTRATION_MODAL:
      return $$state.set('$$showRegistrationModal', false);

    default:
      return $$state;
  }
}
