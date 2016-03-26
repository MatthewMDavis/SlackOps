import Immutable from 'immutable';

import actionTypes from '../constants/commentsConstants';

export const $$initialState = Immutable.fromJS({
  $$comments: []
});

export default function commentsReducer($$state = $$initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.COMMENTS_UPDATE:
      return $$state.mergeIn(['$$comments'], payload.data);

    default:
      return $$state;
  }
}
