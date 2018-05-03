/**
* Project:  JusTeam/client
*
* Module name: One Team Page
*
* Author: ZHANG Yuechen, XU Lu
*
* Date created: 20180301
*
* Purpose: A Page for users to view a single team with a teamID. Lists of member
* and To Join a team。
*
* Revision History:
*
* Date      Author          Ref    Revision
* 20180301  Julian           1     Construct a team Card Module with SingleTeam.
* 20180303  Julian           2     Add a List of events and TimeLine.
* 20180330  Bob              3     Reset the module to a new page
* 20180402  Julian, Bob      4     Revise the data structure of team to make synchronization with API.
* 20180403  Julian, Bob      5     Connect the data to backend database, handle button redirections
*
**/
import React,{Component} from 'react';
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix,Timeline,Steps,Tag,Divider,Tabs} from 'antd'
import 'antd/dist/antd.css'
import '../pages/AccountInfoPage.css'
import PostEditor from '../sections/PostEditor'
import EditableTable from './editableActivityList'
import PostContentViewer from '../modules/PostContentViewer'
import PostTag from '../modules/PostTag'
import EditTeamInfo from './EditTeamInfo'
import JoinRequest from './JoinForm'
import {viewOneTeam} from '../../services/teamService'
import {logIn} from "../../services/accountService";
import {connect} from "react-redux";
import TeamInfo from './TeamInfo'

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}
const { Header, Content, Sider } = Layout;

const TimeLine=[{
    teamID : 1,
    eventID : 1,
    startTime : "2018-9-16",
    endTime : "2019-9-4",
    title : "xixi",
    location : "location1",
    specification : "lalalalla",
},
    {
        teamID : 1,
        eventID:2,
        startTime : "2018-9-16",
        endTime : "2019-9-4",
        title : "xixi",
        location : "location1",
        specification : "lalalalla",
    },
    {
        teamID : 1,
        eventID:3,
        startTime : "2018-9-16",
        endTime : "2019-9-4",
        title : "xixi",
        location : "location1",
        specification : "lalalalla",
    },];
const Member=[{Name:'Billy', Avatar:'http://img03.52wan.cn/2016/06/06/0945511tv3y56gi3gaie4.jpg'},
    {Name:'Sleepy', Avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
    {Name:'Polar Bear',Avatar:'http://preview.quanjing.com/mf057/mf700-03299295.jpg'},
    {Name:'Bob',Avatar:'http://image11.m1905.cn/uploadfile/2011/0211/20110211055630721.jpg'},
    {Name:'Michael',Avatar:'http://www.xz7.com/up/2016-6/2016061710515319007.jpg'},];
var TeamStatus="Processing"
var teamName="CSCI3280 Team"
var teamDescription="CSCI3280 Team, what you want is to add some works here.";
var notification="please submit all work on the CUHK BlackBoard onTime!!!";
const Step=Steps.Step;

const mapStateToProps=state=>{
    return{
        userID: state.userID,
        viewingTeamID:state.viewingTeamID,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        logInDispatch: userID=>{
            dispatch(logIn(userID));
        },

    }
}

class OneTeamPage extends Component{
    state={
        teaminfo:{introduction:"CSCI3280 Team, what you want is to add some works here.",
            reminder:"please submit all work on the CUHK BlackBoard onTime!!!",
            category:"lalala xixixi",
            status:"Fighting",
            teamTitle:"CSCI3100",
            memberList:{
                num:7,
                IDList:["123","234","345"],
            },
        },
        TimeLine:TimeLine,
    };
    componentWillMount(){
        if(this.props.viewingTeamID) {
            viewOneTeam(this.props.viewingTeamID).then((response)=>{
                console.log("One team response: "+JSON.stringify(response));
                if(response.state==='success'){

                    if(response.team) {
                        console.log("team:  "+JSON.stringify(response.team) )
                        this.setState({
                        teaminfo:response.team,
                    });
                }
                }
            })
        }
    }

    render(){
        return(
            <div>
                <div>

               <TeamInfo teaminfo={this.state.teaminfo} />
                </div>
                <Card className="center">
                <Tabs defaultActiveKey="1" onChange={callback} style={{margin:"20px"}}>
                    <TabPane tab="Events" key="1"><EditableTable TimeLine={this.state.TimeLine} count={this.state.TimeLine.length}/>
                    </TabPane>
                    <TabPane tab="Edit Info" key="2"><EditTeamInfo/>
                        <br/>
                    </TabPane>

                </Tabs>
                </Card>

                <Layout style={{ padding: '24px 24px 24px' }}>
                  <Content style={{ background: '#fff', padding: 24, margin: 0, height: 400, width:"80%" }}>

                    <PostEditor className="center" teamID={this.props.viewingTeamID} eventID={this.state.teaminfo.eventList ? JSON.stringify(this.state.teaminfo.eventList.IDList[0]):-1} />
                  </Content>
                  <JoinRequest/>
                </Layout>
               <div>
                   <PostTag/>
               </div>

            </div>
        );
    }

}
export  default connect(mapStateToProps,mapDispatchToProps)  (OneTeamPage);
