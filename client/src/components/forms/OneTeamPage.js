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
                        <Col span={20}><br/><h1>{teamName}</h1>
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


                    </Card>
                </div>
                <Card className="center">
                <Tabs defaultActiveKey="1" onChange={callback} style={{margin:"20px"}}>
                    <TabPane tab="Events" key="1"><EditableTable/>
                    </TabPane>
                    <TabPane tab="Edit Info" key="2"><EditTeamInfo/>
                        <br/>
                    </TabPane>

                </Tabs>
                </Card>

                <Layout style={{ padding: '24px 24px 24px' }}>
                  <Content style={{ background: '#fff', padding: 24, margin: 0, height: 400, width:"80%" }}>
                    <PostEditor/>
                  </Content>
                </Layout>
               <div>
                   <PostTag/>
               </div>
<<<<<<< HEAD

=======
               <EditableTable/>
>>>>>>> frontend
            </div>
        );
    }

}
export  default OneTeamPage;
