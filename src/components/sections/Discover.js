
import React,{Component} from 'react';
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix} from 'antd'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'



const { Meta } = Card;
const Search = Input.Search;


const Discover=()=>
    (
        <div>
            Discover section
            <div>
        <Carousel id="carousel" autoplay>
            <div><h3>JusTeam</h3></div>
            <div><h3>Find Your Team</h3></div>
            <div><h3>What is New</h3></div>
            <div><h3>Contact Us</h3></div>
            </Carousel>
        </div>


        <div>
            <Row>
              <Col className="aspan" span={8}><br></br>
              <h3 style={{color:"#fff"}}>Create a project Team!</h3>
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
                <p style={{color:"#fff", margin:"30px"}}>whatever you need is to set an account and just do it!</p>
              </Col>
              <Col className="aspan" span={8}><br></br>
              <h3 style={{color:"#fff"}}>Join a Team!</h3>
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
                <p style={{color:"#fff", margin:"30px"}}>Some sample texts in it and I am lazy to handle it so I don not know what i am saying...</p>
              </Col>
              <Col className="aspan" span={8}><br></br>
              <h3 style={{color:"#fff"}}>Your Team Management</h3>
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
              <Icon style={{size:"200px", margin:"5px"}}type="smile" />
                <p style={{color:"#fff", margin:"30px"}}>whatever you need is to set an account and just do it!</p>
              </Col>
            </Row>
          </div>

         <div style={{ background: '#333'}}>
         <Search
            style={{ width: "95%",height: "120%", margin:"30px"}}
            placeholder="search for whatever you want!"
            onSearch={value => console.log(value)}
            enterButton
            />
         </div>

          <div style={{ background: '#333', padding: '26px 16px 16px' }}>
            <Col className="teamspan" span={8}><br></br>
            <Card style={{ width: "95%"}}
            cover={<img  alt="example" src="http://p3.wmpic.me/article/2016/05/01/1462070018_hCMgQCFh.jpg" />}
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="CSCI3280"
            description="Please Join OUR CSCI3280 Group!"
          />
        </Card>
        </Col>
            <Col className="teamspan" span={8}><br></br>
            <Card style={{ width: "95%"}}
            cover={<img  alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}>
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="CSCI3280"
            description="Please Join OUR CSCI3280 Group!"
          />
        </Card></Col>
            <Col className="teamspan" span={8}><br></br>
            <Card style={{ width: "95%"}}
            cover={<img  alt="example" src="http://img3.3lian.com/2006/011/19/011.jpg" />}
            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}>
          <Meta
            avatar={<Avatar src="http://p3.wmpic.me/article/2016/05/01/1462070018_hCMgQCFh.jpg" />}
            title="CSCI3280"
            description="Please Join OUR CSCI3280 Group!"
          />
        </Card></Col>
                Suggested teams to join
            </div>
        </div>
    );
export default Discover;
