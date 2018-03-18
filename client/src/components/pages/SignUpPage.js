import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import SignUpForm from '../forms/SignUpForm'

const SignUpPage=()=>(
  <div>
      <Link to='/'>
          <Button icon="rollback"/>
      </Link>
      <SignUpForm/>

  </div>
);
export default SignUpPage;