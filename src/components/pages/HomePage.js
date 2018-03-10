import  React,{Component} from 'react'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix} from 'antd'
import logo from '../../logo.svg'
import 'antd/dist/antd.css'
import NotiPage from "./NotiPage";
import './HomePage.css'
import AccountInfoPage from "./AccountInfoPage";
import Dashboard from './Dashboard'

const {Footer}= Layout;

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
    <div style={{background:'#5DADE2'}}>
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


        <div style={{ background: '#fff', padding: '26px 0px 0px' }}>
            <Route path='/home/accountInfo'  component={AccountInfoPage} />
            <Route path='/home/dash'  component={Dashboard} />
            <Route path='/home/notification'  component={NotiPage} />
        </div>


    <div>
    <Layout>
            <Footer style={{ background:'#5DADE2', color:'#fff',textAlign: 'center' ,  width:'100%'}}>
              <br/>CSCI3100 Group23 Justeam <p/>
          </Footer>
        </Layout>
    </div>

    </div>
);
}
}
export  default  HomePage;
