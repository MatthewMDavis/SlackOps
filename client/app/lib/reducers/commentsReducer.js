import Immutable from 'immutable';

import actionTypes from '../constants/commentsConstants';

export const $$initialState = Immutable.fromJS({
  $$comments: [],
  $$article: null
});

export default function commentsReducer($$state = $$initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.COMMENTS_UPDATE:
      return { ...$$state, $$comments: payload.data };

    default:
      return $$state;
  }
}
