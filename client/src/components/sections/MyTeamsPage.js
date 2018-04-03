import React from 'react'
import {Tabs, Col, Button, Icon,List,Table,Divider} from 'antd'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'
import CommunicationPage from '../forms/CommunicationPage'
import OneTeamPage from '../forms/OneTeamPage'
import {getUserTeams,viewOneTeam} from '../../services/teamService'
import JoinRequest from '../forms/JoinForm'
import {Route} from 'react-router-dom'
const TabPane = Tabs.TabPane;

const TeamData = getUserTeams();
function callback(key) {
    console.log(key);
}
const column1= [{
  title: 'Title',
  dataIndex: 'teamTitle',
  key: 'title',
}, {
  title: 'Start Time',
  dataIndex: 'starTime',
  key: 'starTime',
},{
  title: 'End Time',
  dataIndex: 'endTime',
  key: 'endTime',
},
{
  title: 'Category',
  dataIndex: 'category',
  key: 'category',
},
{
  title:'Actions',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Detail - {record.title}</a>
    </span>
  ),
},
];
const Team=[
  {
    key:'1',
    status:'fighting',
    teamTitle:'ESTR2102Team',
    maxMember:'100',
    starTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  },
  {
    key:'2',
    status:'notstart',
    teamTitle:'ENGG2430A Team',
    maxMember:'100',
    starTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  },
  {
    key:'3',
    status:'end',
    teamTitle:'Van you see',
    maxMember:'100',
    starTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  },
  {
    key:'4',
    status:'fighting',
    teamTitle:'ESTR2002Team',
    maxMember:'100',
    starTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  },
];
const notstart= Team.filter(item => item.status==='notstart');
const fighting= Team.filter(item => item.status==='fighting');
const ended=Team.filter(item => item.status==='end');


const MyTeamsSection=()=>
    (
        <div>
            All My Teams
            <Tabs defaultActiveKey="1" onChange={callback} style={{margin:"20px"}}>
                <TabPane tab="Not Started" key="1"><Table columns={column1} dataSource={notstart} />
                </TabPane>
                <TabPane tab="In Progress" key="2"><Table columns={column1} dataSource={fighting} />
                    <br/>
                </TabPane>
                <TabPane tab="Arrive Terminal" key="3">
                  <Table columns={column1} dataSource={ended} />
                    <br/>
                </TabPane>
            </Tabs>
            <br/>
            <CommunicationPage/>
            <br/>

            <JoinRequest/>
        </div>

    );

const MyTeamsPage=()=>{
    return(
      <div>
          <Route path="/home/dash/myTeams/viewTeam" component={OneTeamPage} />
          <Route path="/home/dash/myTeams" exact component={MyTeamsSection} />
      </div>
    );


}
export default MyTeamsPage;
