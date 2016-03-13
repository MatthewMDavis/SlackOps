import authReducer from './authReducer';
import { $$initialState as $$authState } from './authReducer';
import commentsReducer from '../../bundles/Comments/reducers/commentsReducer';
import { $$initialState as $$commentsState } from '../../bundles/Comments/reducers/commentsReducer';

export default {
  $$commentsStore: commentsReducer,
  $$authStore: authReducer
};

export const initialStates = {
  $$commentsState,
  $$authState
};
