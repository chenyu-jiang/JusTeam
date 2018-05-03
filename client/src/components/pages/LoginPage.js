/**
* Project:  JusTeam/client
*
* Module name: Login Page
*
* Author: XU Lu
*
* Date created: 20180226
*
* Purpose: Page to import Login Form.
*
* Revision History:
*
* Date      Author          Ref    Revision
* 20180226  Bob              1     Page construction.
*
**/
import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom'
import {Button} from 'antd'
import LoginForm from '../forms/LoginForm'
import './AccountInfoPage.css'

class LoginPage extends Component {

    render() {
       /* const {store}= this.context;
        const state=store.getState();*/
        if(this.props.userID) return(<Redirect to='/home/dash' />);
        return (
          <div>
            <div className="login-form">
            <h1 className="H1">Log In to JusTeam</h1>

                <LoginForm />
                <Link to='/'>
                    <Button size="large" className="back">Back</Button>
                </Link>

            </div>
            </div>

        );
    }
}

export  default  LoginPage;
