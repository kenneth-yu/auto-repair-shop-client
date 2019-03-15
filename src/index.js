import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { routerMiddleware, ConnectedRouter} from 'connected-react-router'
import reducer from './Redux/reducer'
import createRootReducer from './Redux/rootreducer'
//allows us to talk to store
import {Provider} from 'react-redux'
//creates the store
import {createStore, applyMiddleware, compose} from 'redux'

// const store = createStore(
//   reducer, /* preloadedState, */
//   applyMiddleware(thunk)
// +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
const history = createBrowserHistory()

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
  ),
)



ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
