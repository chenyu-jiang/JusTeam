import React from 'react'
import {Tabs, Col, Button, Icon,List,Table,Divider} from 'antd'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'
import CommunicationPage from '../forms/CommunicationPage'
import OneTeamPage from '../forms/OneTeamPage'
import {getUserTeams,viewOneTeam} from '../../services/teamService'
import {fetchActInfo} from '../../services/accountService'
import JoinRequest from '../forms/JoinForm'
import {Route} from 'react-router-dom'

const TabPane = Tabs.TabPane;

console.log(Team);

function callback(key) {
    console.log(key);
}
const column1= [{
  title: 'Title',
  dataIndex: 'teamTitle',
  key: 'title',
}, {
  title: 'Start Time',
  dataIndex: 'startTime',
  key: 'startTime',
},{
  title: 'End Time',
  dataIndex: 'endTime',
  key: 'endTime',
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
function Filter(){
const account = fetchActInfo();
const teamList = account.team;
var Teamobj = undefined;
Teamobj = getUserTeams(teamList);
const Team = Teamobj.teams;
let nostart=undefined;
let fighting=undefined;
let ended = undefined;

if (Team){
 notstart= Team.filter(item => item.status==='Recruiting');
 fighting= Team.filter(item => item.status==='Fighting');
 ended=Team.filter(item => item.status==='Finished');
}
}

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
    Filter();
    return(

      <div>
          <Route path="/home/dash/myTeams/viewTeam" component={OneTeamPage} />
          <Route path="/home/dash/myTeams" exact component={MyTeamsSection} />
      </div>
    );


}
export default MyTeamsPage;
