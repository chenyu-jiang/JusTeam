import React from 'react'
import {Dropdown,Button,Menu} from 'antd'
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
        userID: state.userID
    }
}
const mapDispatchToProps= ()=>{
    return{
    }
}


  const topBarIcon=function({userID=undefined}) {
    if(userID)
      return (
          <span align="right">
          <span>
              Hello,{userID}!
          </span>
          <span>
              <Dropdown overlay={menu}>
                  <Link to='/home/accountInfo'>
                      <Button shape="circle"  >
                          <img src={logo} alt='UserLogo' height="30" width="30"/>
                      </Button>
                  </Link>

              </Dropdown>
          </span>
          </span>
          );
      return(

          <span align="right">
              <Link to='/login'>
                  <Button type="primary" className="LoginButton">
                      Login
                  </Button>
              </Link>
          </span>
      );
  }
const TopBarIcon= connect(mapStateToProps,mapDispatchToProps())(topBarIcon)
export default  TopBarIcon