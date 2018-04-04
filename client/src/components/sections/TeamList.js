import React,{Component} from 'react'
import {Tabs, Col, Button, Icon,List,Table,Divider} from 'antd'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'
import CommunicationPage from './CommunicationPage'
import OneTeamPage from './OneTeamPage'
import {getUserTeams,viewOneTeam} from '../../services/teamService'
import {fetchActInfo, logIn} from '../../services/accountService'
import JoinRequest from './JoinForm'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
const TabPane = Tabs.TabPane;
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





class TeamList extends Component{
state={
  teamlist:this.props.teamlist,
}

Filter=(teamlist)=>{
  const nostart= teamlist.filter(item => item.status==='Recruiting');
  const fighting= teamlist.filter(item => item.status==='Fighting');
  const ended=teamlist.filter(item => item.status==='Finished');
  return{
    nostart:nostart,
    fighting:fighting,
    ended:ended,
  };
}

  render(){
    console.log(this.state.teamlist);
    if(this.state.teamlist){
    return(
      <div>
      <Tabs defaultActiveKey="1"  style={{margin: "20px"}}>
          <TabPane tab="Not Started" key="1"><Table columns={column1} dataSource={this.Filter(this.state.teamlist).nostart}/>
          </TabPane>
          <TabPane tab="In Progress" key="2"><Table columns={column1} dataSource={this.Filter(this.state.teamlist).fighting}/>
              <br/>
          </TabPane>
          <TabPane tab="Arrive Terminal" key="3">
              <Table columns={column1} dataSource={this.Filter(this.state.teamlist).ended}/>
              <br/>
          </TabPane>
      </Tabs>
      </div>
    );
  }
  else{
    return(<div>cannot get data</div>);
  }
}
}
export default TeamList;
