import React,{Component} from 'react'
import {Tabs, Col, Button, Icon,List,Table,Divider} from 'antd'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'
import CommunicationPage from './CommunicationPage'
import OneTeamPage from './OneTeamPage'
import {getUserTeams,viewOneTeam} from '../../services/teamService'
import {fetchActInfo, logIn} from '../../services/accountService'
import JoinRequest from './JoinForm'
import {Route,Link} from 'react-router-dom'
import {connect} from 'react-redux'
const TabPane = Tabs.TabPane;
const column1= [{
  title: 'Title',
  dataIndex: 'teamTitle',
  key: 'teamTitle',
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
  title:'Action',
  key: 'action',
  render: (text, record) => (
    <Link to="/home/dash/myTeams/viewTeam">
    <Button onclick={this.props.setTeamDispatch(record.teamID)}>
        Detailed Information
    </Button>
    </Link>
  ),
},
];


const mapStateToProps=state=>{
    return{
        userID: state.userID,
        viewingTeamID:state.viewingTeamID,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        setTeamDispatch: teamID=>{
            dispatch({
                type:"SET_TEAMID",
                viewingTeamID:teamID,
            });
        },

    }
}


class TeamList extends Component{
state={
  teamlist:this.props.teamlist,
}
columns=[{
  title: 'Title',
  dataIndex: 'teamTitle',
  key: 'teamTitle',
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
  title:'Action',
  key: 'action',
  render: (text, record) => (
      <span>
    <Link to="/home/dash/myTeams/viewTeam">
    <Button onClick={()=>{
        console.log("teamID in list: "+record.teamID);
        this.props.setTeamDispatch(record.teamID)}}>
        Select Team
    </Button>
    </Link>

</span>
  ),
},
];


componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.teamlist) !== JSON.stringify(nextProps.teamlist)) // Check if it's a new user, you can also use some unique, like the ID
    {
        this.setState({
            teamlist:nextProps.teamlist,
        });
    }
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
    console.log(this.state);
    if(this.state.teamlist){
    return(
      <div>
      <Tabs defaultActiveKey="1"  style={{margin: "20px"}}>
          <TabPane tab="Not Started" key="1"><Table columns={this.columns} dataSource={this.Filter(this.state.teamlist).nostart}/>
          </TabPane>
          <TabPane tab="In Progress" key="2"><Table columns={this.columns} dataSource={this.Filter(this.state.teamlist).fighting}/>
              <br/>
          </TabPane>
          <TabPane tab="Arrive Terminal" key="3">
              <Table columns={this.columns} dataSource={this.Filter(this.state.teamlist).ended}/>
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
export default  connect(mapStateToProps,mapDispatchToProps) (TeamList);
