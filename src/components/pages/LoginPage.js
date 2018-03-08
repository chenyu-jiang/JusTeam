import React from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import LoginForm from '../forms/LoginForm'

const LoginPage=()=>(
    <div>
        <Link to='/'>
            <Button icon="rollback"/>
        </Link>
        <LoginForm/>
    </div>

);

export  default  LoginPage;