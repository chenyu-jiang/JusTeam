import React,{Component} from 'react';
import { Widget, addResponseMessage} from 'react-chat-widget';
import MyTeamsPage from "../sections/MyTeamsPage";
import Discover from '../sections/Discover'
import Teaming from '../sections/Teaming'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix} from 'antd'
import 'antd/dist/antd.css'
import '../pages/AccountInfoPage.css'
var socket = require('socket.io-client')('http://localhost:3001');
const TeamInfo = [
{type:'TeamName', value:'CSCI3280 Team Project',},
{type:'User Name',value:'Billy Herrington, Tom, Micheal, James',},
{type:'Date of Birth',value:'1997/11/09',},
{type:'Contact',value:'+852-55717767',},
{type:'Personal description',value:'World of wonder, I am an artist, a preformance artist.',},
];
var TeamName= TeamInfo[0].value;
var TeamMember="With "+TeamInfo[1].value;
var TeamID = 12345;

class CommunicationPage extends Component{
  handleMessage=(sendingMessage)=>{
      console.log(`Here is a new message from client. ${sendingMessage}`);
      //send message to the server.
      socket.emit("newMessage", sendingMessage);
  }
  componentDidMount() {
      socket.emit("authentication",{"username": "Bob", "password": "Hunter2"});
      socket.emit("userJoined",{"teamID": TeamID,"nickname":"Nick"+Date.now(),"username":"Bob"});
      socket.on("userJoinedRoom", (data)=>{
          addResponseMessage("User "+ data.user.nickName + " joined room!");
      });
      socket.on("newMessage", (data)=>{
          addResponseMessage("User "+ data.sender.nickName + " said: "+ data.message);
      });
      socket.on("userLeftRoom", (data)=>{
          addResponseMessage("User "+ data.user.nickName + " left.");
      });
      socket.on("unauthorized", (data)=>{
            addResponseMessage("Authorization Failed.");
            socket.emit("authentication",{"username": "Bob", "password": "Hunter2"});
            socket.emit("userJoined",{"teamID": TeamID,"nickname":"Nick"+Date.now(),"username":"Bob"});
      });
  }

  render(){
    return(
    <div>
        This is a CommunicationPage.
        <div className="CommuniteApp">
        <Widget
          handleNewUserMessage={this.handleMessage}
          title={TeamName}
          subtitle={TeamMember}
        />
        </div>
    </div>);
  }

}
export  default  CommunicationPage;
