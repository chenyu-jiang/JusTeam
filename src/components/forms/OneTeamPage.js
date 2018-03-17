
import React,{Component} from 'react';
import MyTeamsPage from "../sections/MyTeamsPage";
import Discover from '../sections/Discover'
import Teaming from '../sections/Teaming'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix,Timeline,Steps,Tag,Divider} from 'antd'
import 'antd/dist/antd.css'
import '../pages/AccountInfoPage.css'
import AvatarList from 'ant-design-pro/lib/AvatarList';

const TimeLine=[{Time:'2018.2.19', DoItem:'Do something1', Description:'I am so bad guy', Status:'finish',},
{Time:'2018.2.19', DoItem:'Do something2', Description:'I am so bad guy', Status:'process',},
{Time:'2018.2.19', DoItem:'Do something3', Description:'I am so bad gu', Status:'wait',},
{Time:'2018.3.19', DoItem:'Do something4', Description:'I am so bad guy', Status:'wait',},
{Time:'2018.4.14', DoItem:'ProjectDemo', Description:'I am so bad guy', Status:'wait',},];
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


class OneTeamPage extends Component{

  render(){
    return(
    <div>
        This is a TeamComponent.
        <div>
          <Card className="TeamCard" style={{width:"98%", margin:"1%"}}>
            <Col span={16}><br/><h1>{teamName}</h1>
              <h3 style={{ margin: '16px 0' }}>Team Status:  <Tag color="#f50"> {TeamStatus}</Tag></h3>
                <h3>Team Member:
                {Member.map(item=><span style={{margin:"3%"}}>
                <Avatar src={item.Avatar}/> <Divider type="vertical"/>{item.Name}</span>
                  )}
              </h3>
            <br/>

        <Card>
          <h2>Project Description</h2>
          <p>{teamDescription}</p>
          <Divider/>
          <h2>Notification Board</h2>
          <p>{notification}</p>
        </Card>

        </Col>
        <Divider type="vertical"/>
      <Col span={8}>

      <Card className="TimeLineCard" style={{margin:"20px"}}>
          <h2>TimeLine<Divider type="vertical">edit</Divider></h2>
          <Steps className="StepLine" direction="vertical">
          {TimeLine.map(item=><Step status={item.Status} key={item.Time} title={item.Time}
            description={item.DoItem}/>
            )}
            </Steps>
            </Card>
      </Col>


          </Card>
        </div>
    </div>
  );
  }

}
export  default OneTeamPage;
