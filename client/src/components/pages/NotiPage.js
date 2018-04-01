import React from 'react'
import NotificationItem from '../forms/Notification'
import {getNewNotiList,getNewNotiNum,getNotiHistory,deleteNoti} from '../../services/notiService'


const NotiPage=()=>
    (
      <div>
         Notification Dashboard
         <NotificationItem/>
      </div>
    );
export default NotiPage;
