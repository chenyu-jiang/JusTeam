import React from 'react'
import {Dropdown,Button,Menu,Avatar} from 'antd'
import {connect} from 'react-redux'
import  {Link} from 'react-router-dom'
import logo from '../../logo.svg'
import  '../pages/HomePage.css'
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
            <Link to='/logout'>
                Logout
            </Link>
        </Menu.Item>
    </Menu>
);
const mapStateToProps= state=>{
    console.log("state fetched:", JSON.stringify(state)) ;
    return{
        userID: state.userID,
        logo:state.logo,
    }
}
const mapDispatchToProps= ()=>{
    return{
    }
}


  const topBarIcon=function({userID=undefined,logo}) {
    if(userID)
      return (
          <span align="right">
          <span style={{color:'#fff', marginRight:'10px'}}>
              Hello, {userID}!
          </span>
          <span>
              <Dropdown overlay={menu}>
                  <Link to='/home/accountInfo'>
                      <Button shape="circle"  >
                          <Avatar src={logo} />
                      </Button>
                  </Link>
              </Dropdown>
          </span>
          </span>
          );
      return(

          <span align="right">
              <Link to='/login'>
                  <Button ghost className="LoginButton">
                      Login
                  </Button>
              </Link>
          </span>
      );
  }
const TopBarIcon= connect(mapStateToProps,mapDispatchToProps())(topBarIcon)
export default  TopBarIcon
