/**
* Project           : JusTeam/client
*
* Module name       : Discover
*
* Author            : ZHANG Yuechen
*
* Date created      : 20180318
*
* Purpose           : The discover section, displaying project introduction
*
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
**/
import React,{Component} from 'react';
import  {Link,Route,Redirect} from 'react-router-dom'
import {Button,Dropdown,Menu,Icon,Col,Row,Carousel,Card,Avatar,Input,Layout,Affix} from 'antd'
import 'antd/dist/antd.css'
import '../pages/HomePage.css'
import title1 from '../../img/title.jpg'
import Content0 from '../../antdm/Content0';
import Home from '../../antdm/index';

const { Meta } = Card;
const Search = Input.Search;


const Discover=()=>
    (
        <div>
            <Home/>

        </div>
    );
export default Discover;
