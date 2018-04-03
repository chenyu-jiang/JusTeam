import {Icon, Button,Card, Avatar,List,Tag,Col,Divider} from 'antd';
import React,{Component} from 'react';
import {getNewNotiNum,getNewNotiList,getNotiHistory,deleteNoti}from '../../services/notiService';
import {connect} from 'react-redux';
import '../pages/AccountInfoPage.css';






const differType=(type,content)=>{
    var title="";
    var color="#f50";
    var description="";
    var action1="";
    var action2="";
    var herf="";
    if(type==="JoinRequest"){
        title=`${content.applicant}  wants to join team: ${content.teamToBeJoined}`;
        color="#f50";
        description=content.joinInfo;
        action1="Accept";
        action2="Refuse";
    }
    if(type==="NewAppcationResult"){
        title= `Your result of application for ${content.teamApplied}`;
        color="#1DA57A";
        description=content.result;
        action1="Detail";
        action2="Delete";
    }
    if(type==="TeamPublicMessage"){
        title= `Annoncement from ${content.teamToBeUpdated} by ${content.sender}`;
        color="#66ccff";
        description=content.message;
        action1="Detail"
        action2="Delete"
    }
    return({
        title:title,
        color:color,
        description:description,
        action1:action1,
        action2:action2,
        herf:herf,
    });
}
class NotificationItem extends Component{
    state={
        getNoti:undefined,
    }

    render(){

        if(this.state.getNoti){
            return(
                <div className="background">
                    <Card className="container">
                        <div>
                            <List
                                itemLayout="vertical"
                                size="large"
                                className="infoList1"

                                dataSource={this.state.getNoti.messages}
                                renderItem={item => (
                                    <Card
                                        style={{marginTop: "2%", height:"200px"}}
                                        type="inner"
                                        title={<Col span={5}><Tag color={differType(item.messageType,item.content).color}>{item.messageType}</Tag></Col>}
                                        extra={<span><Button size="small"> {differType(item.messageType,item.content).action1}</Button> <Button size="small" onClick={this.deleteNoti}>{differType(item.messageType,item.content).action2}</Button></span>}
                                    >
                                        <List.Item
                                            key={item.messageID}>
                                            <List.Item.Meta
                                                title={<span>
            {differType(item.messageType,item.content).title}</span>}

                                            />
                                            {differType(item.messageType,item.content).description}
                                        </List.Item>
                                    </Card>
                                )}
                            />
                        </div>
                    </Card>
                </div>
            );
        }
        else return(
            <div>
                loading
            </div>
        );
    }
    componentDidMount(){

        getNewNotiList().then((response)=>{
                this.setState({"getNoti":response});
            }
        );
    }

}
export default NotificationItem;
