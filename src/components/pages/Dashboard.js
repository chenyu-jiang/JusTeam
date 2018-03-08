import React,{Component} from 'react';
import  {Link,Route,Redirect} from 'react-router-dom'
import{Button} from 'antd'

import MyTeamsPage from "../sections/MyTeamsPage";
import Discover from '../sections/Discover'
import Teaming from '../sections/Teaming'



class Dashboard extends Component {
    render() {
        if(this.props.location.pathname==='/dash') return<Redirect to='/dash/teaming'/>;
        return (
            <div>
                <div>
            <span>
                <Link to='/dash/myTeams'>
            <Button size="large">
            myTeams
        </Button>
                </Link>
            </span>
                    <span>
                <Link to='/dash/teaming'>
            <Button size="large">
            Teaming
        </Button>
                </Link>
            </span>
                    <span>
                <Link to='/dash/discover'>
            <Button size="large">
            Discover
        </Button>
                </Link>
            </span>
                </div>
                <div>
                    <Route path='/dash/myTeams' component={MyTeamsPage}/>
                    <Route path='/dash/teaming' component={Teaming}/>
                    <Route path='/dash/discover' component={Discover}/>
                </div>
            </div>
        );
    }
}


export  default  Dashboard;