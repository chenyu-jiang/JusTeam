import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import SignUpForm from '../forms/SignUpForm'

const SignUpPage=()=>(
  <div className="bkg">
      <div className="signup-form">
      <h1 className="H1">New Account to JusTeam</h1>
      <SignUpForm/>
      <Link to='/'>
          <Button size="large" className="back">Back</Button>
      </Link>
      </div>

  </div>
);
export default SignUpPage;
