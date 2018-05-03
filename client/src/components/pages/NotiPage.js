import React from 'react'
import{BackTop}from'antd'
import NotificationItem from '../forms/Notification'
import './AccountInfoPage.css'

const NotiPage=()=>
    (
      <div className="background">
        
         <div className="secondspan"><h1>- Notification Board -</h1></div>
         <NotificationItem />
         <BackTop className="back-up">
         <div className="ant-back-top-inner">BACK</div>
         </BackTop>
      </div>
    );
export default NotiPage;
