import  React,{Component} from 'react'
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix} from 'antd'
import './HomePage.css'
import 'antd/dist/antd.css'
import NotiPage from "./NotiPage";
import AccountInfoPage from "./AccountInfoPage";
import TopBarIcon from '../modules/topBarIcon'
import Dashboard from './Dashboard'

const {Footer}= Layout;



class HomePage extends Component{
    render(){
        if(this.props.location.pathname==='/home') return<Redirect to='/home/dash'/>;
        return(
    <div className="HomePage">
    <Affix><div style={{background:'#f50'}}>
        <Col span={20}>
        <Link to='/home/dash'>
            <Button size={30} shape="circle" >
            Logo
        </Button>
        </Link>
        </Col>



    <span>

        <TopBarIcon/>
    </span>
    </div></Affix>


        <div style={{ background: '#fff', padding: '26px 0px 0px' }}>
            <Route path='/home/accountInfo'  component={AccountInfoPage} />
            <Route path='/home/dash'  component={Dashboard} />
            <Route path='/home/notification'  component={NotiPage} />
        </div>

        <div>
            <Layout>
                <Footer style={{ background:'#222', color:'#fff',textAlign: 'center' ,  width:'100%'}}>
                    <Col class="FooterCol1" span={8}><h3><b style={{color:"#fff"}}>Contact us</b></h3>
                        <div class="GroupMember" style={{textAlign:"center", padding:"5%", size:"20px", color:"#DDD"}}>
                            <div>JIANG Chenyu</div>
                            <div>DENG Shiyuan</div>
                            <div>WANG Yuxuan</div>
                            <div>XU Lu</div>
                            <div>ZHANG Yuechen</div>
                        </div>
                    </Col>
                    <Col class="FooterCol1" span={8}><h3><b style={{color:"#fff"}}>Contact us</b></h3>

                    </Col>
                    <Col class="FooterCol1" span={8}><h3><b style={{color:"#fff"}}>Contact us</b></h3>

                    </Col>
                    <Row>
                        <div><br/>CSCI3100 Group23 Justeam <p/>
                        </div>
                    </Row>
                </Footer>
            </Layout>
        </div>


    </div>
);
}
}
export  default  HomePage;