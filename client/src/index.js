import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {persistReducer,persistStore}  from 'redux-persist'

import {BrowserRouter,Route} from 'react-router-dom';
import './index.css';
import App from './App';
import RootReducer from './reducers/index'
import registerServiceWorker from './registerServiceWorker';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'


const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, RootReducer)


let store = createStore(persistedReducer);
let persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
    <BrowserRouter>
        <Route component={App} />
    </BrowserRouter>
        </PersistGate>
    </Provider>  ,
    document.getElementById('root'));
registerServiceWorker();
