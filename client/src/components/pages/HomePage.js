/**
* Project:  JusTeam/client
*
* Module name: HomePage component.
*
* Author: XU Lu, ZHANG Yuechen
*
* Date created: 20180228
*
* Purpose: Define The routers on the top bar and component of search bar
*
* Revision History:
*
* Date      Author          Ref    Revision
* 20180228  Bob              1     Router Construction.
* 20180328  Julian           2     Add search bar component and CSS style.
*
**/
import  React,{Component} from 'react'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix} from 'antd'
import {getTeamSearchResult} from "../../services/searchService"
import './HomePage.css'
import 'antd/dist/antd.css'
import NotiPage from "./NotiPage";
import SearchPage from './SearchPage';
import AccountInfoPage from "./AccountInfoPage";
import TopBarIcon from '../modules/topBarIcon'
import Dashboard from './Dashboard'
import Footer from '../../antdm/Footer';
import {connect} from "react-redux";
import jtlogo from  '../../img/log.png'

const Search = Input.Search;

const mapStateToProps=state=>{
    return{

    }
}
const mapDispatchToProps=dispatch=>{
    return{
        setUrlDispatch: fromUrl=>{
            dispatch({
                type:"SET_FROMURL",
                fromUrl:fromUrl,
            });
        },

    }
}


class HomePage extends Component{
  state = {
    searchResult : undefined
  }
  handleSearch=async (value)=>{
    var result = await getTeamSearchResult(value);
    console.log("result:");
    console.log(result.results);
    this.setState({
      searchResult: result.results
    });
  }
    render(){
        if(this.state.searchResult) return(
            <SearchPage searchResult={this.state.searchResult}/>
        );
        if(this.props.location.pathname==='/home') return<Redirect to='/home/dash'/>;
        if(this.props.location.pathname==='/home/dash/login') return<Redirect to='/login'/>;
        this.props.setUrlDispatch(this.props.location.pathname);
        return(
    <div className="HomePage">
    <Affix><div style={{background:'rgba(26,165,122,0.7)', padding:'10px'}}>
    <Col span={18}>
        <Link to='/home/dash'>
        <img src={jtlogo} style={{width: 40, height: 40}} />
        </Link>
        <Search
            style={{ width: "70%",height: "120%", marginLeft:'10%'}}
            placeholder="search for whatever you want!"
            onSearch={
              value=>this.handleSearch(value)

            }
            enterButton
        />
        </Col>



    <span>
    <Col span={24}/>
        <TopBarIcon/>
    </span>
    </div></Affix>

        <div style={{ background: '#fff', padding: '20px 0px 0px' }}>
            <Route path='/home/accountInfo'  component={AccountInfoPage} />
            <Route path='/home/dash'  component={Dashboard} />
            <Route path='/home/notification'  component={NotiPage} />
        </div>
      <div>
      <Footer/>

      </div>

    </div>

);
}
}
export  default connect(mapStateToProps,mapDispatchToProps)(HomePage);
