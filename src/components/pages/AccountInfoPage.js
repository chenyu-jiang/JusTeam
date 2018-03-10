import React from 'react';
import {List, Avatar,Row,Col,Button} from 'antd';
import {Link} from 'react-router-dom'
import './AccountInfoPage.css'

//Just a simulation, in real-time get key from the server.
const AccountInfo=[
{type:'JusTeam ID', value:'8432178',},
{type:'User Name',value:'Billy Herrington',},
{type:'Date of Birth',value:'1997/11/09',},
{type:'Contact',value:'+852-55717767',},
];
const userName='Billy Herrington';

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

    <Col className="infospan">
    <div><h2 textAlign="center">Hello, {userName}</h2>
    </div></Col>
    <Col className="secondspan" >
    <div><h3 textAlign="center">Personal Information</h3>
    </div></Col>
            <List className="infoList" style={{margin:'50px'}}
            itemLayout="horizontal"
            dataSource={AccountInfo}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                title={item.type}
                description={item.value}
                />
              </List.Item>
            )}
          />
          <div>
          <Link to='/home/dash/myTeams'>
          <Button type="primary"> View My Teams
          </Button>
          </Link>
          </div>
    
    </div>
);

export  default  AccountInfoPage;
