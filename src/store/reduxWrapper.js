import React, { useState } from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from './api';

import contentReducer from './content/reducer';
import userReducer from './user/reducer';
import uiReducer from './ui/reducer';
import onStoreCreate from './onStoreCreate';

const rootReducer = combineReducers({
  content: contentReducer,
  userData: userReducer,
  ui: uiReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(api)));

store.dispatch(onStoreCreate());

export const LangContext = React.createContext();

export default ({ children }) => {
  const { ui: { language }} = store.getState();
  const [ prevLang, setLang ] = useState(language);

  return (
    <Provider store={store}>
      <LangContext.Provider value={{
        prevLang,
        setLang
      }}>
        {children}
      </LangContext.Provider>
    </Provider>
  );
}
