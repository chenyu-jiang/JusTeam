import React,{Component} from 'react';
import {Link,Redirect} from 'react-router-dom'
import {Button} from 'antd'
import LoginForm from '../forms/LoginForm'

class LoginPage extends Component {

    render() {
       /* const {store}= this.context;
        const state=store.getState();*/
        if(this.props.userID) return(<Redirect to='home/dash' />);
        return (
            <div>
                <Link to='/'>
                    <Button icon="rollback"/>
                </Link>
                <LoginForm/>
            </div>

        );
    }
}

export  default  LoginPage;