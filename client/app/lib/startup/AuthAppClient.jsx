import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import AuthContainer from '../containers/AuthContainer';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
export default (props) => {
  const store = ReactOnRails.getStore("RGBlog");
  const reactComponent = (
    <Provider store={store}>
      <AuthContainer />
    </Provider>
  );
  return reactComponent;
};
