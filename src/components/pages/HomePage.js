import  React,{Component} from 'react'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon} from 'antd'
import logo from '../../logo.svg'
import 'antd/dist/antd.css'
import NotiPage from "./NotiPage";
import AccountInfoPage from "./AccountInfoPage";
import Dashboard from './Dashboard'

const menu = (
    <Menu>
        <Menu.Item>
            <Link to='/home/accountInfo'>Account Information</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/home/notification'>Notifications</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/home/dash/myTeams'>
                My Teams
            </Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/home'>
                Logout
            </Link>
        </Menu.Item>
    </Menu>
);


class HomePage extends Component{
    render(){
        if(this.props.location.pathname==='/home') return<Redirect to='/home/dash'/>;
        return(
    <div className="HomePage">
    <div style={{background:'#5DADE2',padding:'10px 10px 10px'}}>
        <Link to='/home/dash'>
            <Button size="large" shape="circle" >
            Logo
        </Button>
        </Link>

        top bar with
        loginButton

           <Link to='/login' >
               <Button type="primary" className="LoginButton">
                   Login
               </Button>
           </Link>
        , after login:
        <Dropdown overlay={menu}>
            <Link to='/home/accountInfo' >
            <Button shape="circle" gost>

             <img src={logo} alt='UserLogo' height="30" width="30"/>
            </Button>
            </Link>

        </Dropdown>

    </div>


        <div style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }}>
            <Route path='/home/accountInfo'  component={AccountInfoPage} />
            <Route path='/home/dash'  component={Dashboard} />
            <Route path='/home/notification'  component={NotiPage} />
        </div>

    </div>
);
}
}
export  default  HomePage;