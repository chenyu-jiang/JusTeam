import React from 'react'
import {Tabs, Col, Button, Icon,List,Table,Divider} from 'antd'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'
import CommunicationPage from '../forms/CommunicationPage'
import OneTeamPage from '../forms/OneTeamPage'
import JoinRequest from '../forms/JoinForm'
const TabPane = Tabs.TabPane;


function callback(key) {
    console.log(key);
}
const column1= [{
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'Team Size',
  dataIndex: 'teamsize',
  key: 'teamsize',
}, {
  title: 'Team Leader',
  dataIndex: 'teamleader',
  key: 'teamleader',
},
{
  title:'Actions',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Detail - {record.title}</a>
      <Divider type="vertical" />
      <a href="#">Quit</a>
    </span>
  ),
},
];
const Teamnotstart=[
  {
    key:'1',
    title:'ESTR2102Team',
    teamsize:'3',
    teamleader:'polarbear',
  },
  {
    key:'2',
    title:'ENGG2430A Team',
    teamsize:'3',
    teamleader:'polarbear',
  },
  {
    key:'3',
    title:'Van you see',
    teamsize:'3',
    teamleader:'polarbear',
  },
  {
    key:'4',
    title:'ESTR2002Team',
    teamsize:'5',
    teamleader:'polarbearxixi',
  },
];
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];


const MyTeamsPage=()=>
    (
        <div>
            All My Teams

            <Tabs defaultActiveKey="1" onChange={callback} style={{margin:"20px"}}>

                <TabPane tab="Not Started" key="1"><Table columns={column1} dataSource={Teamnotstart} />
                    <br/>
                    <Col className="infospan"><div>
                        <Button  type="primary" ><Icon type="tags-o" />
                            Check Info</Button>
                    </div>
                    </Col>
                </TabPane>
                <TabPane tab="In Progress" key="2"><List
                    size="large"
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
                    <br/>
                    <Col className="infospan"><div>
                        <Button  type="primary" ><Icon type="book" />
                            Team Management</Button>
                    </div>
                    </Col>
                </TabPane>
                <TabPane tab="Arrive Terminal" key="3">
                    <List
                        size="large"
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
                    <br/>
                    <Col className="infospan"><div>
                        <Button  type="primary" ><Icon type="star-o" />
                            rate for your teammate</Button>
                    </div>
                    </Col>
                </TabPane>

            </Tabs>
            <br/>
            <CommunicationPage/>
            <br/>
            <OneTeamPage/>
            <JoinRequest/>
        </div>

    );
export default MyTeamsPage;
