import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux/store.js';
import { BrowserRouter } from 'react-router-dom';

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>{element}</BrowserRouter>
      </Provider>
    </>
  );
};

export const wrapPageElement = ({ element }) => (
  <PersistGate loading={null} persistor={persistor}>
    {element}
  </PersistGate>
);
