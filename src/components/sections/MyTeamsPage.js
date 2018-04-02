import React from 'react'
import {Tabs, Col, Button, Icon,List} from 'antd'
import  {Link,Route,Redirect} from 'react-router-dom'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'
import CommunicationPage from '../forms/CommunicationPage'
import OneTeamPage from '../forms/OneTeamPage'
import JoinRequest from '../forms/JoinForm'
import CreateForm from '../forms/Createform'
import Discover from "./Discover";
import Teaming from "./Teaming";

const TabPane = Tabs.TabPane;


function callback(key) {
    console.log(key);
}
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const AllTeams=()=>(
    <div>
    All My Teams
        <div>
    <Link to="/home/dash/myTeams/createTeam">
        <Button type="primary" className="hoverbot">
            Create your new team!
        </Button>
    </Link>
        </div>
    <Tabs defaultActiveKey="1" onChange={callback} style={{margin:"20px"}}>

        <TabPane tab="Not Started" key="1"><List
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
        />
            <br/>
            <Col className="infospan"><div>
                <Button  type="primary" ><Icon type="tags-o" />
                    Check Info</Button>
            </div>
            </Col>
        </TabPane>
        <TabPane tab="In Progress" key="2"><List
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
        />
            <br/>
            <Col className="infospan"><div>
                <Button  type="primary" ><Icon type="book" />
                    Team Management</Button>
            </div>
            </Col>
        </TabPane>
        <TabPane tab="Arrive Terminal" key="3">
            <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (<List.Item>{item}</List.Item>)}
            />
            <br/>
            <Col className="infospan"><div>
                <Button  type="primary" ><Icon type="star-o" />
                    rate for your teammate</Button>
            </div>
            </Col>
        </TabPane>

    </Tabs>
    <br/>
    <CommunicationPage/>
    <br/>
    <OneTeamPage/>
    <JoinRequest/>
</div>
);
const MyTeamsPage=()=>
    (
      <div>
          <Route path='/home/dash/myTeams/' exact component={AllTeams}/>
          <Route path='/home/dash/myTeams/createTeam' component={CreateForm}/>

      </div>

    );
export default MyTeamsPage;
