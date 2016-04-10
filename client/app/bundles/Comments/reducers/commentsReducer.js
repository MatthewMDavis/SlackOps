import Immutable from 'immutable';

import actionTypes from '../constants/commentsConstants';

export const $$initialState = Immutable.fromJS({
  $$comments: [],
  $$commentError: null,
  $$commentPending: false,
  $$fetchingComments: false,
  $$userComment: ''
});

export default function commentsReducer($$state = $$initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.COMMENT_SUCCESS:
      return $$state.merge({
         $$comments: payload.data,
         $$commentPending: false,
         $$commentError: null,
         $$userComment: ''
      });

    case actionTypes.UPDATE_COMMENTS:
      return $$state.merge({
         $$comments: payload.data,
         $$fetchingComments: false,
         $$commentError: null,
      });

    case actionTypes.USER_COMMENT_CHANGE:
      return $$state.setIn(['$$userComment'], payload)

    case actionTypes.COMMENT_PENDING:
      return $$state.merge({
        $$commentPending: true
      })

    case actionTypes.FETCHING_COMMENTS:
      return $$state.merge({
        $$fetchingComments: true
      })

    case actionTypes.COMMENT_ERROR:
      const xhrErrors = payload.data.error ? { error: [payload.data.error] } : payload.data.errors;
      return $$state.merge({
        $$commentError: xhrErrors,
        $$commentPending: false
      });

    default:
      return $$state;
  }
}
