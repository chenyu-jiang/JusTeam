/**
* Project:  JusTeam/client
*
* Module name: AccountInfo Page
*
* Author: ZHANG Yuechen, XU lu
*
* Date created: 20180305
*
* Purpose: An Account Information Page to show the Account info and edit form.
*
* Revision History:
*
* Date      Author          Ref    Revision
* 20180305  Julian           1     Construct a account info list for default value.
* 20180315  Bob              2     Reconstruct the information data structure.
*
**/
import React,{Component} from 'react';
import {List, Avatar,Row,Col,Button, Rate,Tabs,Icon,Card} from 'antd';
import {Link,Redirect} from 'react-router-dom'
import './AccountInfoPage.css'
import {fetchActInfo} from '../../services/accountService'
import AccountInfoList from '../modules/AccountInfoList'
import {connect} from 'react-redux'
import EditAccountInfo from '../forms/EditAccountInfo'
import EditableTable from "../forms/editableActivityList";
const TabPane = Tabs.TabPane;
//Just a simulation, in real-time get key from the server.
var Personal=0;
function callback(key) {
    console.log(key);
    key=1;
}
const mapStateToProps= state=>{
    console.log("state fetched:", JSON.stringify(state)) ;
    return{
        userID: state.userID,
        logo:state.logo,
    }
}
const mapDispatchToProps= ()=>{
    return{
    }
}
let data=undefined;
class AccountInfoPage extends Component {
    state={
        data:undefined,
    }
    render(){
        const userID= this.props.userID;
    if(!userID) return(
        <Redirect to='/home/dash/login'/>
    );

    if(this.state.data)
    return(
        <div>
          <br/>
          <Card className="center">
            <Tabs defaultActiveKey="1" onChange={callback} >

                <TabPane tab="My Info" key="1">
                <Col className="infospan" >
                    <div>
                        <Avatar  src={this.props.logo} size="large" icon="user">
                        </Avatar>
                    </div>
                </Col>

                <Col className="secondspan">
                    <div><h2 textalign="center">Hello, {this.state.data.nickname}</h2>
                    </div></Col>
                    <Col className="secondspan" >
                        <div><h3 >Personal Information</h3>
                        </div></Col>
                <AccountInfoList data={this.state.data} />
                <br/>
                <Col className="infospan"><div>
                    <Link to='/home/dash/myTeams'>
                        <Button id ="centerbutton" size="large" type="primary"> View My Teams
                        </Button>
                    </Link>
                </div>
                </Col>
                </TabPane>
                <TabPane tab="Edit Info" onChange={callback} key="2">
                  <EditAccountInfo />
                </TabPane>
                </Tabs>
                </Card>
        </div>


    );
 else return(<div>
        loading!!
    </div>);
}
 componentDidMount(){
        if(this.props.userID)
        fetchActInfo(this.props.userID).then((response)=>{
            if(response.requestState)
            this.setState({data:response.result})});
 }
}
export  default  connect(mapStateToProps,mapDispatchToProps)(AccountInfoPage);
