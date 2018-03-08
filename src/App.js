import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignUpPage from './components/pages/SignUpPage'
//import logo from './logo.svg';
import './App.css';

const App= ()=> (
  <div>
      <Route path='/'  component={HomePage} />
      <Route  path='/login' exact component={LoginPage} />
      <Route path='/signUp' exact component={SignUpPage} />
  </div>
);

export default App;
