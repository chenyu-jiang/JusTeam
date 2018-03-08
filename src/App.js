import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignUpPage from './components/pages/SignUpPage'
//import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        if(this.props.location.pathname==='/') return<Redirect to='/home'/>;
        return (
            <div>
                <Route path='/home' component={HomePage}/>
                <Route path='/login' exact component={LoginPage}/>
                <Route path='/signUp' exact component={SignUpPage}/>
            </div>
        );
    }
}
export default App;
