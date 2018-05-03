/**
* Project:  JusTeam/client
*
* Module name: Login Page
*
* Author: XU Lu
*
* Date created: 20180226
*
* Purpose: Page to import Sign Up Form.
*
* Revision History:
*
* Date      Author          Ref    Revision
* 20180226  Bob              1     Page construction.
*
**/
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
