/**
* Project:  JusTeam/client
*
* Module name: Join Application Form
*
* Author: ZHANG Yuechen, JIANG Chenyu
*
* Date created: 20180330
*
* Purpose: An notification Board for users to check team announcements, result of
* joinrequests, handle join requests.
*
* Revision History:
*
* Date      Author          Ref    Revision
* 20180330  Julian           1     Construct a List with Single NotificationItem.
* 20180403  Julian, Michael  2     Connect the List data to backend database, handle button redirections
*
**/
import {Icon, Button,Card, Avatar,List,Tag,Col,Divider} from 'antd';
import React,{Component} from 'react';
import {getNewNotiNum,getNewNotiList,getNotiHistory,deleteNoti}from '../../services/notiService';
import {addMember} from "../../services/teamService";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import '../pages/AccountInfoPage.css';

const mapStateToProps=state=>{
    return{
        userID: state.userID,
        viewingTeamID: state.viewingTeamID,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        changeTeamDispatch: teamID=>{
            dispatch({
                type:"SET_TEAMID",
                viewingTeamID:teamID,
            });
        },

    }
}

class NotificationItem extends Component{
state={
    getNoti:undefined,
}

differType=(type,content,messageID)=>{
  content = JSON.parse(content);
  var title="";
  var color="#f50";
  var description="";
  var action1="";
  var action2="";
  var herf="";
  var func1;
  var func2;
  if(type==="JoinRequest"){
      title=`${content.applicant}  wants to join team: ${content.teamToBeJoined}`;
      color="#f50";
      description=content.joinInfo.inputdescription;
      console.log(content);
      action1="Accept";
      action2="Refuse";
      func1 = ()=>{
          console.log("ADD!!!");
          addMember(content.userID,content.teamID);
          //redirect
          this.props.changeTeamDispatch(content.teamID);
          //this.props.history.push('/home/dash/myTeams/viewTeam');
      };
      func2 = ()=> {
          deleteNoti(messageID,type);
          //renew
      };
  }
  if(type==="NewApplicationResult"){
        title= `Your result of application for ${content.teamApplied}`;
        color="#1DA57A";
      description=content.result;
      action1="Details";
      action2="Delete";
      func1 = ()=>{
          //redirect
      };
      func2 = ()=> {
          deleteNoti(messageID,type);
      };
    }
    if(type==="TeamPublicMessage"){
        title= `Annoncement from ${content.teamToBeUpdated} by ${content.sender}`;
        color="#66ccff";
      description=content.message;
      action1="Details";
      action2="Delete";
      func1 = ()=>{
          //redirect

      };
      func2 = ()=> {
          deleteNoti(messageID,type);
      };
    }
  return({
    title:title,
    color:color,
    description:description,
    action1:action1,
    action2:action2,
    herf:herf,
    func1: func1,
    func2: func2
  });
}


  componentDidMount(){
    getNotiHistory(0,1000).then((response)=>{
        this.setState({"getNoti":response});
        console.log(this.state.getNoti);
    }
);
 }

  render(){

if(this.state.getNoti){
    return(
      <div className="background">
      <Card className="container">
      <div>
      <List
        itemLayout="vertical"
        size="large"
        className="infoList1"

        dataSource={this.state.getNoti.messages}
        renderItem={item => (
          <Card
            style={{marginTop: "2%", height:"200px"}}
            type="inner"
            title={<Col span={5}><Tag color={this.differType(item.messageType,item.content,item.messageID).color}>{item.messageType}</Tag></Col>}
            extra={<span><Button size="small" onClick={this.differType(item.messageType,item.content,item.messageID).func1}> {this.differType(item.messageType,item.content,item.messageID).action1}</Button> <Button size="small" onClick={this.differType(item.messageType,item.content,item.messageID).func2}>{this.differType(item.messageType,item.content,item.messageID).action2}</Button></span>}
          >
          <List.Item
            key={item.messageID}>
            <List.Item.Meta
            title={<span>
            {this.differType(item.messageType,item.content).title}</span>}

            />
            {this.differType(item.messageType,item.content).description}
          </List.Item>
          </Card>
        )}
      />
      </div>
      </Card>
      </div>
      );
}
else return(
      <div>
        loading
      </div>
    );
 }


}export default  connect(mapStateToProps,mapDispatchToProps) (withRouter(NotificationItem));
