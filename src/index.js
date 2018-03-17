import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import "antd/dist/antd.less";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './default.less';

ReactDOM.render(
    <BrowserRouter>
        <Route component={App} />
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
