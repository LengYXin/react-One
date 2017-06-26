/// <reference path="../typings/tsd.d.ts" />
import *  as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
import App from './containers/App'
import todoApp from './reducers'

let store = createStore(todoApp)
console.log("store", store);
let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)