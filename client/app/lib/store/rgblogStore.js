import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import reducers from '../reducers';
import { initialStates } from '../reducers';

export default props => {
  // This is how we get initial props Rails into redux.
  const initialComments  = props.comments;
  const initialUser = props.user;
  const article = props.article;
  const { $$commentsState, $$authState } = initialStates;

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$commentsStore: $$commentsState.merge({
      $$comments: initialComments,
      $$article: article
    }),
    $$authStore: $$authState.merge({
      $$user: initialUser
    }),
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);

  return store;
};
