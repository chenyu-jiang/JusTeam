import {Icon, Button,Card, Avatar,List,Tag,Col,Divider} from 'antd';
import React,{Component} from 'react';
import {getNewNotiNum,getNewNotiList,getNotiHistory,deleteNoti}from '../../services/notiService';
import {connect} from 'react-redux';
import './AccountInfoPage.css';
import Footer from '../../antdm/Footer';
const fakeresult=[
  {
    key:'1',
    status:'fighting',
    teamTitle:'ESTR2102Team',
    maxMember:'100',
    starTime:'3-19',
    endTime:'4-4',
    category:'lalala',
    introduction:'xbdsyaucvsa',

  },
  {
    key:'2',
    status:'notstart',
    teamTitle:'ENGG2430A Team',
    maxMember:'100',
    starTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  introduction:'xbdsyaucvsa',
  },
  {
    key:'3',
    status:'end',
    teamTitle:'Van you see',
    maxMember:'100',
    starTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  introduction:'xbdsyaucvsa',
  },
  {
    key:'4',
    status:'fighting',
    teamTitle:'ESTR2002Team',
    maxMember:'100',
    starTime:'3-19',
    endTime:'4-4',
    category:'lalala',
  introduction:'xbdsyaucvsa',
  },
];

const pagination = {
 pageSize: 5,
 defaultcurrent: 1,
 onChange: (() => {}),

  showSizeChanger:true,
  showTotal:((total, range) => `${range[0]}-${range[1]} of ${total} items`),

};

//const getNewNotiList


class SearchResult extends Component{
  refresh() {
      window.location.reload();
  }
  render(){
  return(
    <div className="background">
    <Button className="center" type="primary" onClick={this.refresh}>Back</Button>
    <Card className="container">
    <div>
    <List
      itemLayout="vertical"
      size="large"
      className="infoList1"

      dataSource={this.props.searchResult}
      renderItem={item => (
        <Card
          style={{marginTop: "2%", height:"200px"}}
          type="inner"
          title={<Col span={5}>{item.content.category.replace(/"/g,"").split(" ").slice(1).map
          (item=><Tag color="#1DA57A">{item}</Tag>)}</Col>}
          extra={<span><Button size="small"> Detail</Button></span>}
        >
        <List.Item
          key={item.key}>
          <List.Item.Meta
          title={<span>
          {item.content.teamTitle}</span>}

          />
          {item.content.introduction}
        </List.Item>
        </Card>
      )}
    />
    </div>
    </Card>
    <Footer/>
    </div>
    );
  }
}export default SearchResult;
