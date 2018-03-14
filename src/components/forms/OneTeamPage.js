
import React,{Component} from 'react';
import MyTeamsPage from "../sections/MyTeamsPage";
import Discover from '../sections/Discover'
import Teaming from '../sections/Teaming'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix,Timeline,Steps} from 'antd'
import 'antd/dist/antd.css'
import '../pages/AccountInfoPage.css'
import AvatarList from 'ant-design-pro/lib/AvatarList';

const TimeLine=[{Time:'2018.2.19', DoItem:'Do something1', Description:'I am so bad guy', Status:'finish',},
{Time:'2018.2.19', DoItem:'Do something2', Description:'I am so bad guy', Status:'process',},
{Time:'2018.2.19', DoItem:'Do something3', Description:'I am so bad gu', Status:'wait',},
{Time:'2018.3.19', DoItem:'Do something4', Description:'I am so bad guy', Status:'wait',},
{Time:'2018.4.14', DoItem:'ProjectDemo', Description:'I am so bad guy', Status:'wait',},];
const Step=Steps.Step;


class OneTeamPage extends Component{

  render(){
    return(
    <div>
        This is a TeamComponent.
        <div>
        <Card className="TeamCard" style={{width:"98%", margin:"1%"}}>
        <Col span={8}><Card className="TimelineCard" style={{margin:"2%" }}>
        <Steps className="StepLine" direction="vertical">
        {TimeLine.map(item=><Step status={item.Status} key={item.Time} title={item.Time}
          description={item.DoItem}/>
          )}
          </Steps>
          </Card></Col>
          <Col span={16}><Card className="TeamInfoCard" style={{margin:"2%"}}>

          </Card></Col>
          </Card>
        </div>
    </div>
  );
  }

}
export  default OneTeamPage;
