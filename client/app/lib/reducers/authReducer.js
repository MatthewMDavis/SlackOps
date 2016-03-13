import Immutable from 'immutable';

import actionTypes from '../constants/authConstants';

export const $$initialState = Immutable.fromJS({
  $$user: null
});

export default function commentsReducer($$state = $$initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SUBMIT_REGISTRATION:
      return { ...$$state, $$user: payload.data };

    case actionTypes.SUBMIT_LOGIN:
      return { ...$$state, $$user: payload.data };

    case actionTypes.SUBMIT_LOGOUT:
      return $$state.set('$$user', null);

    default:
      return $$state;
  }
}
