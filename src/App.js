import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import AccountInfoPage from './components/pages/AccountInfoPage'
import MyTeamsPage from './components/pages/MyTeamsPage'
import NotiPage from './components/pages/NotiPage'
import SignUpPage from './components/pages/SignUpPage'
//import logo from './logo.svg';
import './App.css';

const App= ()=> (
  <div>
      <Route path='/' exact component={HomePage} />
      <Route path='/login' exact component={LoginPage} />
      <Route path='/accountInfo' exact component={AccountInfoPage} />
      <Route path='/myTeams' exact component={MyTeamsPage} />
      <Route path='/notification' exact component={NotiPage} />
      <Route path='/signUp' exact component={SignUpPage} />
  </div>
);

export default App;
