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
      return $$state.mergeDeep({
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
      const xhrErrors = payload.data.error ? { error: [payload.data.error] } : payload.data.errors;
      return $$state.merge({
        $$authError: xhrErrors,
        $$authPending: false
      });

    case actionTypes.SUBMIT_LOGOUT:
      return $$state.set('$$user', null);

    case actionTypes.SUBMIT_FB_LOGIN:
      const $$facebookUser = { username: 'facebook_user' }
      return $$state.merge({ '$$user': $$facebookUser });

    case actionTypes.SHOW_LOGIN_MODAL:
      return $$state.set('$$showLoginModal', true);

    case actionTypes.SHOW_REGISTRATION_MODAL:
      return $$state.set('$$showRegistrationModal', true);

    case actionTypes.HIDE_LOGIN_MODAL:
      return $$state.merge({
        $$showLoginModal: false,
        $$authError: null,
        $$authPending: false
      });

    case actionTypes.HIDE_REGISTRATION_MODAL:
      return $$state.merge({
        $$showRegistrationModal: false,
        $$authError: null,
        $$authPending: false
        });

    default:
      return $$state;
  }
}
