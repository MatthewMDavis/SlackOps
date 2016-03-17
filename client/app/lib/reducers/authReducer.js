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
    case actionTypes.AUTH_SUCCESS:
      const $$newUser = Immutable.fromJS(payload.data);
      return $$state.merge({
        $$user: $$newUser,
        $$authError: null,
        $$authPending: false,
        $$showLoginModal: false,
        $$showRegistrationModal: false
      });

    case actionTypes.AUTH_PENDING:
      return $$state.merge({
        $$authPending: true
      });

    case actionTypes.AUTH_ERROR:
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
