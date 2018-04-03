import  React,{Component} from 'react'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix} from 'antd'
import './HomePage.css'
import 'antd/dist/antd.css'
import NotiPage from "./NotiPage";
import AccountInfoPage from "./AccountInfoPage";
import TopBarIcon from '../modules/topBarIcon'
import Dashboard from './Dashboard'
import Footer from '../../antdm/Footer';
import {connect} from "react-redux";


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
    render(){
        if(this.props.location.pathname==='/home') return<Redirect to='/home/dash'/>;
        if(this.props.location.pathname==='/home/dash/login') return<Redirect to='/login'/>;
        this.props.setUrlDispatch(this.props.location.pathname);
        return(
    <div className="HomePage">
    <Affix><div style={{background:'rgba(26,165,122,0.7)', padding:'10px'}}>
    <Col span={18}>
        <Link to='/home/dash'>
            <Button size={30} shape="circle" >
            Logo
        </Button>
        </Link>
        <Search
            style={{ width: "70%",height: "120%",marginLeft:'10%'}}
            placeholder="search for whatever you want!"
            onSearch={value => console.log(value)}
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
