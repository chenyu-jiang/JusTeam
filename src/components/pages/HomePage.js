import  React from 'react'
import  {Link} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon} from 'antd'
import logo from '../../logo.svg'
import 'antd/dist/antd.css'


const menu = (
    <Menu>
        <Menu.Item>
            <Link to='/accountInfo'>Account Information</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/notification'>Notifications</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/myTeams'>
                My Teams
            </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/'>
                Logout
            </Link>
        </Menu.Item>
    </Menu>
);


const LoginPage=()=>(
    <div className="HomePage">
    <div style={{background:'#5DADE2',padding:'10px 10px 10px'}}>
        top bar with
        loginButton

           <Link to='/login' >
               <Button type="primary" className="LoginButton">
                   Login
               </Button>
           </Link>
        , after login:
        <Dropdown overlay={menu}>
            <Link to='/' >
            <Button shape="circle" gost>

             <img src={logo} alt='UserLogo' height="30" width="30"/>
            </Button>
            </Link>

        </Dropdown>

    </div>

    <div>
        HomePage contents
    </div>

     <div>
         Search bar
     </div>

        <div style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }}>
            Suggested teams to join
        </div>

    </div>
);

export  default  LoginPage;