import Immutable from 'immutable';

import actionTypes from '../constants/authConstants';

export const $$initialState = Immutable.fromJS({
  $$user: null,
  $$authError: null,
  $$authPending: false,
  $$showLoginModal: false,
  $$showRegistrationModal: false
});


export default function commentsReducer($$state = $$initialState, action) {
  const { type, payload, error } = action;

  switch (type) {
    case actionTypes.SUBMIT_REGISTRATION:
      const $$newSignup = Immutable.fromJS(payload.data);
      return $$state.setIn(['$$user'], $$newSignup).set('$$showRegistrationModal', false);

    case actionTypes.LOGIN_SUCCESS:
      const $$newLogin = Immutable.fromJS(payload.data);
      return $$state.merge({
        $$user: $$newLogin,
        $$authError: null,
        $$authPending: false,
        $$showLoginModal: false
      });

    case actionTypes.LOGIN_PENDING:
      return $$state.merge({
        $$authPending: true
      });

    case actionTypes.LOGIN_ERROR:
      return $$state.merge({
        $$authError: payload.data.error,
        $$authPending: false
      });

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
