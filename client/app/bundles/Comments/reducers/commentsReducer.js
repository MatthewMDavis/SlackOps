import Immutable from 'immutable';

import actionTypes from '../constants/commentsConstants';

export const $$initialState = Immutable.fromJS({
  $$comments: [],
  $$userComment: ''
});

export default function commentsReducer($$state = $$initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.COMMENTS_UPDATE:
      return $$state.merge({
         $$comments: payload.data,
         $$userComment: ''
      });

    case actionTypes.USER_COMMENT_CHANGE:
      return $$state.setIn(['$$userComment'], payload)

    default:
      return $$state;
  }
}
