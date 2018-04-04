import React,{Component} from 'react'
import {Tabs, Col, Button, Icon,List,Table,Divider,message} from 'antd'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'
import CommunicationPage from '../forms/CommunicationPage'
import OneTeamPage from '../forms/OneTeamPage'
import {getUserTeams,viewOneTeam} from '../../services/teamService'
import {fetchActInfo, logIn} from '../../services/accountService'
import JoinRequest from '../forms/JoinForm'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import TeamList from '../forms/TeamList'

const TabPane = Tabs.TabPane;

let TeamData = undefined;
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
const Team=[
  {
    key:'1',
    status:'Fighting',
    teamTitle:'ESTR2102Team',
    maxMember:'100',
    startTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  },
  {
    key:'2',
    status:'Recruiting',
    teamTitle:'ENGG2430A Team',
    maxMember:'100',
    startTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  },
  {
    key:'3',
    status:'Finished',
    teamTitle:'Van you see',
    maxMember:'100',
    startTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  },
  {
    key:'4',
    status:'Fighting',
    teamTitle:'ESTR2002Team',
    maxMember:'100',
    startTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  },
];
const notstart= Team.filter(item => item.status==='Recruiting');
const fighting= Team.filter(item => item.status==='Fighting');
const ended=Team.filter(item => item.status==='Finished');

const mapStateToProps=state=>{
    return{
        userID: state.userID
    }
}
const mapDispatchToProps=dispatch=>{
    return{

    }
}

const decideItem=(data)=>{
    if(data.TeamData) {
        if (data.TeamData.error) return ("Fetching user info failed, error: " + data.TeamData.error);
        else if (data.TeamData) return (JSON.stringify(data.TeamData));
    }
    else return("You don't have any teams yet! Would you like to create one?");
}

class  MyTeamsSection extends Component {
    state={
        TeamData:undefined,
    }

    render() {
        return(
            <div>
                <div>
                    <TeamList teamlist={this.state.TeamData}/>
                </div>
                <br/>
                
                <br/>

            </div>
        );
    }

    componentWillMount(){

        fetchActInfo(this.props.userID).then((response)=> {
                if (response.requestState===true) {
                    if (response.result.team) {

                        getUserTeams(response.result.team).then((response) => {
                            if (response.teams)
                                this.setState({
                                    TeamData: response.teams,
                                });
                            else {
                                if (response.error) {
                                    this.setState({
                                        TeamData: {error: response.error,},
                                    });
                                }
                                else this.setState({
                                        TeamData: undefined,
                                    }
                                );
                            }
                            console.log("received user Teams: " + JSON.stringify(this.state.TeamData));
                        });
                    }
                    else this.setState({
                            TeamData: undefined,
                        }
                    );
                }
                else {
                    message.error("Failed to fetch annount information!");
                    this.setState({
                            TeamData: undefined,
                        }
                    );
                }
            }
        );

    }

}


const MyTeamsPage=()=>{
    return(
      <div>
          <Route path="/home/dash/myTeams/viewTeam" component={OneTeamPage} />
          <Route path="/home/dash/myTeams" exact component={connect(mapStateToProps,mapDispatchToProps)(MyTeamsSection)} />
      </div>
    );


}
export default MyTeamsPage;
