/**
* Project:  JusTeam/client
*
* Module name: Application Router & Auto Login judgement
*
* Author: Create-react-app, XU Lu
*
* Date created: 20180220
*
* Purpose: Define the logic of login and auto-login.
*
* Revision History:
*
* Date      Author          Ref    Revision
* 20180321  Bob             1      Add Redux connection module and auto-login judgement.
*
**/
import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import LogOutModule from './components/modules/LogOutModule'
import SignUpPage from './components/pages/SignUpPage'
import './App.css';
import {logIn,fetchActInfo} from "./services/accountService";
import {connect} from 'react-redux'

const mapStateToProps=state=>{
    return{
        userID: state.userID,
        logo:state.logo,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        logInDispatch: userID=>{
            dispatch(logIn(userID));
        },
      SetLogoDispatch: logo=>{
          dispatch({
              type:"SET_LOGO",
              logo:logo,
          })
      }
    }
}

class App extends Component {
    componentWillMount(){
        fetchActInfo().then((response)=>{
          console.log("response at app.js:  "+JSON.stringify(response) );
            if(response.requestState)
                if(response.requestState===true)
                    if(response.result) {
                        if ((response.result.photo) && (response.result.photo !== this.props.logo)) this.props.SetLogoDispatch(response.result.photo);
                        if (response.result.username) {
                            console.log("Auto login invoked");
                            this.props.logInDispatch(response.result.username);
                        }
                    }
        });
    }
        render() {

        if((this.props.location.pathname==='/')) return<Redirect to='/home'/>;
        return (
            <div>
                <Route path='/logout' exact component={LogOutModule}/>
                <Route path='/home' component={HomePage}/>
                <Route path='/login' exact component={LoginPage}/>
                <Route path='/signUp' exact component={SignUpPage}/>
            </div>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
