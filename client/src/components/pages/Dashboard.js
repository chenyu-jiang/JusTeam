import React,{Component} from 'react';
import  {Link,Route,Redirect} from 'react-router-dom'
import{Button} from 'antd'
import './HomePage.css'
import MyTeamsPage from "../sections/MyTeamsPage";
import Discover from '../sections/Discover'
import Teaming from '../sections/Teaming'
import LogDepButton from '../modules/LogDepButton'


class Dashboard extends Component {
    render() {
        if(this.props.location.pathname==='/home/dash') return<Redirect to='/home/dash/teaming'/>;
        return (
            <div>
                <div>
            <span>
                <Link to='/home/dash/myTeams'>
            <LogDepButton text="My Teams" />
                </Link>
            </span>
                    <span>
                <Link to='/home/dash/teaming'>
            <Button size="large">
            Teaming
        </Button>
                </Link>
            </span>
                    <span>
                <Link to='/home/dash/discover'>
            <Button size="large">
            Discover
        </Button>
                </Link>
            </span>
                </div>
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