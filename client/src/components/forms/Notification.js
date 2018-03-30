import {Icon, Button,Card} from 'antd';
import React,{Component} from 'react';
import '../pages/AccountInfoPage.css';


class NotificationItem extends Component{
  render(){
  return(
    <div>
      this is a Notifacation Item.
      <div>
      <Card
      style={{marginRight:"10%", marginLeft:"10%", marginTop: "2%"}}
      type="inner"
      title="GROUP title"
      extra={<a href="#">More</a>}
    >
      ddl approaches.
    </Card>
    <Card
      style={{marginRight:"10%", marginLeft:"10%", marginTop: "2%" }}
      type="inner"
      title="Inner Card title"
      extra={<a href="#">More</a>}
    >
      Inner Card content
    </Card>

      </div>
    </div>
    );
  }
}export default NotificationItem;
