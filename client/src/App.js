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
        userID: state.userID
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        logInDispatch: userID=>{
            dispatch(logIn(userID));
        },

    }
}

class App extends Component {
    componentWillMount(){
        fetchActInfo().then((response)=>{
          console.log("response at app.js:  "+JSON.stringify(response) );
            if(response.requestState)
                if(response.requestState===true)
                    if(response.result)
                   if(response.result.username){ console.log("Auto login invoked"); this.props.logInDispatch(response.result.username);}
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
