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
            <Link to='/accountInfo'>Account Information</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/notification'>Notifications</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/dash/myTeams'>
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

class Dashredirect extends Component{
    render() {
        return(
        <div className="Dashboarddiv">
            <Route path='/' exact component={Dashboard}/>
            <Route path='/dash' component={Dashboard}/>
        </div>);
    }
}
class HomePage extends Component{
    render(){
        if(this.props.location.pathname==='/') return<Redirect to='/dash'/>;
        return(
    <div className="HomePage">
    <div style={{background:'#5DADE2',padding:'10px 10px 10px'}}>
        <Link to='/dash'>
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
            <Link to='/accountInfo' >
            <Button shape="circle" gost>

             <img src={logo} alt='UserLogo' height="30" width="30"/>
            </Button>
            </Link>

        </Dropdown>

    </div>


        <div style={{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }}>
            <Route path='/accountInfo' exact component={AccountInfoPage} />
            <Route path='/'  component={Dashredirect} />
            <Route path='/notification' exact component={NotiPage} />
        </div>

    </div>
);
}
}
export  default  HomePage;