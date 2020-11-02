import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import contentReducer from './content/reducer';
import userReducer from './user/reducer';
import uiReducer from './ui/reducer';
import onStoreCreate from './onStoreCreate';

const rootReducer = combineReducers({
  content: contentReducer,
  userData: userReducer,
  ui: uiReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(onStoreCreate());

export default ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
