/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';

import React from 'React'; 
import {applyMiddleware, createStore}  from 'redux';
import thunk  from 'redux-thunk';
import promise  from './promise';
import array  from './array';
import analytics  from './analytics';
// import reducers  from '../rootReducer';
import reducers from '../rootReducer';
import createLogger  from 'redux-logger';
import {persistStore, autoRehydrate}  from 'redux-persist';
import {AsyncStorage}  from 'react-native';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createYoteAppStore = applyMiddleware(thunk, promise, array, analytics, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  // console.log("EFHEFEFHEF EF HEF EHF EHF EFH EFH EFH");
  // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
  const store = autoRehydrate()(createYoteAppStore)(reducers); 
  // const store = createStore(reducers, undefined, autoRehydrate());
  persistStore(store, {storage: AsyncStorage}, onComplete); 
  // persistStore(store, {
  //   storage: AsyncStorage
  //   , blacklist: ['exercise', 'sectionReducer']
  // }, onComplete);  
  if (isDebuggingInChrome) {
    window.store = store;
  }
  window.store = store;

  return store;
}

module.exports = configureStore;
