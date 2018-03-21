import React, {Component} from 'react';
import {List, Avatar,Row,Col,Button, Rate} from 'antd';
import {Link} from 'react-router-dom'
import './AccountInfoPage.css'
import AccountInfoList from '../modules/AccountInfoList'

//Just a simulation, in real-time get key from the server.
const defaultinfo= {
    userID: 'Van Darkholme',
    nickname:'world of wonder',
    birthday: '1919/8/10',
    phone: '+852-114514',
    description: 'My name is van, I am an artist, a preformance artist.',
};
const userName='Billy Herrington';
var Personal=0;

const AccountInfoPage=(data)=>(
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
            <div><h2 textalign="center">Hello, {userName}</h2>
            </div></Col>
        <Col className="secondspan" >
            <div><h3 >Personal Information</h3>
            </div></Col>
        <AccountInfoList data={defaultinfo} />
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




    </div>


);

export  default  AccountInfoPage;
