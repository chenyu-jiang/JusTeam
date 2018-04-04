import React,{Component} from 'react';
import MyTeamsPage from "../sections/MyTeamsPage";
import Discover from '../sections/Discover'
import Teaming from '../sections/Teaming'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix} from 'antd'
import LogDepButton from '../modules/LogDepButton'
import 'antd/dist/antd.css'
import './HomePage.css'
import AccountInfoPage from "./AccountInfoPage";




class Dashboard extends Component {
    render() {
        if(this.props.location.pathname==='/home/dash') return<Redirect to='/home/dash/discover'/>;
        return (
            <div>
                <div style={{marginBottom:'20px'}}>
                <Row type="flex" justify="space-around" >
              <Col>
                <Link to='/home/dash/myTeams'>
            <LogDepButton text="My Teams" className="hoverbot"/>
                </Link>
            </Col>
            <Col >
                <Link to='/home/dash/teaming'>
            <Button type="ghost" className="hoverbot">
            Teaming
        </Button>
                </Link>
            </Col>
            <Col>
                <Link to='/home/dash/discover'>
            <Button type="ghost" className="hoverbot">
            Discover
        </Button>
          </Link>
            </Col>
            </Row>

                </div>
                  <hr className= "line" />
                <div>
                    <Route path='/home/dash/myTeams' component={MyTeamsPage}/>
                    <Route path='/home/dash/teaming' component={Teaming}/>
                    <Route path='/home/dash/discover' component={Discover}/>
                </div>


            </div>
        );
    }
}


export  default  Dashboard;
