import React, {Component} from 'react';
import {List, Avatar,Row,Col,Button, Rate} from 'antd';
import {Link} from 'react-router-dom'
import './AccountInfoPage.css'

import CommunicationPage from '../forms/CommunicationPage'
//Just a simulation, in real-time get key from the server.
const AccountInfo=[
{type:'JusTeam ID', value:'8432178',},
{type:'User Name',value:'Billy Herrington',},
{type:'Date of Birth',value:'1997/11/09',},
{type:'Contact',value:'+852-55717767',},
{type:'Personal description',value:'World of wonder, I am an artist, a preformance artist.',},
];
const userName='Billy Herrington';
var Personal=0;

const AccountInfoPage=()=>(
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
    <div><h2 textAlign="center">Hello, {userName}</h2>
    </div></Col>
    <Col className="secondspan" >
    <div><h3 >Personal Information</h3>
    </div></Col>
            <List bordered="true" className="infoList"
            itemLayout="horizontal"
            dataSource={AccountInfo}
            renderItem={item => (

              <List.Item actions={[<a id="editInfo">edit</a>]}>
                <List.Item.Meta
                title={item.type}
                description={item.value}
                />

              </List.Item>


            )}
          />
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
