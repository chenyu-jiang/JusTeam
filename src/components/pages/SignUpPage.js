import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'antd'

const SignUpPage=()=>(
  <div>
      <Link to='/'>
          <Button icon="rollback"/>
      </Link>
      A sign up form

  </div>
);
export default SignUpPage;