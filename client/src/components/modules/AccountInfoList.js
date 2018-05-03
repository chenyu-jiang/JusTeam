import React from 'react';
import {List} from 'antd';
import '../pages/AccountInfoPage.css'

const preventNull=(value)=>{
    if(value) return value;
    else return "";
}

const AccountInfoList=({data})=>{
    console.log('Data of AccountInfoList'+JSON.stringify(data))
    return(
        <List bordered="true" className="infoList"
              itemLayout="horizontal">
            <List.Item>
                <List.Item.Meta title="User Name" description={preventNull(data.username)} />
            </List.Item>
            <List.Item>
                <List.Item.Meta title="Nickname" description={preventNull(data.nickname)} />
            </List.Item>
            <List.Item>
                <List.Item.Meta title="Birthday" description={preventNull(data.birthday)} />
            </List.Item>
            <List.Item>
                <List.Item.Meta title="Contact" description={preventNull(data.phone)} />
            </List.Item>
            <List.Item>
                <List.Item.Meta title="Personal Description" description={preventNull(data.introduction)} />
            </List.Item>
        </List>
    );

}

export  default AccountInfoList;
