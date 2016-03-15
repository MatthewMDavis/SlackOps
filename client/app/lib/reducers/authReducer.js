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
      return { ...$$state, $$user: payload.data };

    case actionTypes.SUBMIT_LOGIN:
      const $$newUser = Immutable.fromJS(payload.data);
      return $$state.setIn(['$$user'], $$newUser).set('$$showLoginModal', false);

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
