/**
* Project:  JusTeam/client
*
* Module name: root-render
*
* Author: Create-react-app, XU Lu
*
* Date created: 20180220
*
* Purpose: render the whole page.
*
* Revision History:
*
* Date      Author          Ref    Revision
* N/A
*
**/
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {BrowserRouter,Route} from 'react-router-dom';
import './index.css';
import App from './App';
import RootReducer from './reducers/index'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(RootReducer);


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <Route component={App} />
    </BrowserRouter>
    </Provider>  ,
    document.getElementById('root'));
registerServiceWorker();
