import React from 'react';
import {List, Avatar,Row,Col,Button, Rate,Tabs,Icon,Card} from 'antd';
import {Link,Redirect} from 'react-router-dom'
import './AccountInfoPage.css'
import {fetchActInfo} from '../../services/accountService'
import AccountInfoList from '../modules/AccountInfoList'
import {connect} from 'react-redux'
import EditAccountInfo from '../forms/EditAccountInfo'
import EditableTable from "../forms/editableActivityList";
const TabPane = Tabs.TabPane;
//Just a simulation, in real-time get key from the server.
var Personal=0;
function callback(key) {
    console.log(key);
    key=1;
}
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

const AccountInfoPage=connect(mapStateToProps,mapDispatchToProps)(({userID})=>{
    if(!userID) return(
        <Redirect to='/home/dash/login'/>
    );
    const data=fetchActInfo(userID);
    return(
        <div>
          <br/>
          <Card className="center">
            <Tabs defaultActiveKey="1" onChange={callback} >

                <TabPane tab="My Info" key="1">
                <Col className="infospan" >
                    <div>
                        <Avatar size="large" icon="user">
                        </Avatar>
                    </div>
                </Col>

                <Col className="secondspan">
                    <div><h2 textalign="center">Hello, {data.nickname}</h2>
                    </div></Col>
                    <Col className="secondspan" >
                        <div><h3 >Personal Information</h3>
                        </div></Col>
                <AccountInfoList data={data} />
                <br/>
                <Col className="infospan"><div>
                    <Link to='/home/dash/myTeams'>
                        <Button id ="centerbutton" size="large" type="primary"> View My Teams
                        </Button>
                    </Link>
                </div>
                </Col>
                </TabPane>
                <TabPane tab="Edit Info" onChange={callback} key="2">
                  <EditAccountInfo />
                </TabPane>
                </Tabs>
                </Card>
        </div>


    );});

export  default  AccountInfoPage;
