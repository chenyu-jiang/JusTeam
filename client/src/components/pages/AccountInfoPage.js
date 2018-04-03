import React from 'react';
import {List, Avatar,Row,Col,Button, Rate} from 'antd';
import {Link,Redirect} from 'react-router-dom'
import './AccountInfoPage.css'
import {fetchActInfo} from '../../services/accountService'
import AccountInfoList from '../modules/AccountInfoList'
import {connect} from 'react-redux'
import EditAccountInfo from '../forms/EditAccountInfo'
import EditableTable from "../forms/editableActivityList";

//Just a simulation, in real-time get key from the server.
var Personal=0;

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
            <div>
                Account Information
            </div>

            <Col className="infospan" >
                <div>
                    <Avatar size="large" icon="user">
                    </Avatar>
                </div></Col>

            <Col className="secondspan">
                <div><h2 textalign="center">Hello, {data.nickname}</h2>
                </div></Col>
            <Col className="secondspan" >
                <div><h3 >Personal Information</h3>
                </div></Col>
            <AccountInfoList data={data} />
            <Col className="infospan"><div>
                <Link to='/home/dash/myTeams'>
                    <Button id ="centerbutton" size="large" type="primary"> View My Teams
                    </Button>
                </Link>

                <h className="spacebetween">  </h>

                <Link to='/home/dash/myTeams'>
                    <Button id ="centerbutton" size="large" type="ghost">Edit Personal Info
                    </Button>
                </Link>
            </div>
            </Col>


         <EditAccountInfo/>

        </div>


    );});

export  default  AccountInfoPage;
