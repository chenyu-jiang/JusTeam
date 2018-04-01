
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
