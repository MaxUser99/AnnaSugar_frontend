import React, { useState, useCallback } from 'react';
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
  const [ callbacksMap, setCallbacksMap ] = useState(new Map());

  const saveCallback = useCallback((key, lang, callback) => {
    if (!key) return;

    const { lang: prevLang } = callbacksMap.get(key) || {};
  
    if (!!prevLang && prevLang !== lang) {
      callback();
    }
  
    const updatedMap = callbacksMap.set(key, { lang, callback });
    setCallbacksMap(new Map(updatedMap));
  }, [ callbacksMap, setCallbacksMap ]);

  return (
    <Provider store={store}>
      <LangContext.Provider value={{ callbacksMap, saveCallback }}>
        {children}
      </LangContext.Provider>
    </Provider>
  );
}
