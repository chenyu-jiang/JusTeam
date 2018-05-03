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


const TabPane = Tabs.TabPane;


function callback(key) {
    console.log(key);
}
const { Header, Content, Sider } = Layout;
const teaminfo=
  {introduction:"CSCI3280 Team, what you want is to add some works here.",
  reminder:"please submit all work on the CUHK BlackBoard onTime!!!",
  category:"lalala xixixi",
  status:"Fighting",
  teamTitle:"CSCI3100",
  memberList:{
    num:7,
    IDList:["123","234","345"],
  },
};


class TeamInfo extends Component{
  state={
    teaminfo:undefined,
  }
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.teaminfo) !== JSON.stringify(nextProps.teaminfo)) // Check if it's a new user, you can also use some unique, like the ID
    {
        this.setState({
            teaminfo:nextProps.teaminfo,
        });
    }
}
    render(){
        console.log("teaminfo in teaminfo.js: "+JSON.stringify(this.state.teaminfo))
      if(this.state.teaminfo){
        return(
            <div>

                        <div>
                    <Card className="center" >
                        <Col span={20}><br/><h1>{this.state.teaminfo.teamTitle}</h1>
                            <h3 style={{ margin: '16px 0' }}>Team Status:  <Tag color="#f50"> {this.state.teaminfo.status}</Tag></h3>
                            <h3>Team Member:
                                {this.state.teaminfo.memberList.IDList.map(item=><span style={{margin:"3%"}}>
                 <Divider type="vertical"/>{item}</span>)}
                            </h3>
                            <br/>

                            <Card style={{width:"113%", margin:"2%"}}>
                                <h2>Project Description</h2>
                                <p>{this.state.teaminfo.introduction}</p>
                                <Divider/>
                                <h2>Notification Board</h2>
                                <p>{this.state.teaminfo.reminder}</p>
                            </Card>

                        </Col>


                    </Card>
                </div>
            </div>
        );
      }
      else{
        return(<div>cannot get the data!</div>);
      }
    }

}
export  default  TeamInfo;
