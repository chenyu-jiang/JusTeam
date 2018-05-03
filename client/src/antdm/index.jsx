/**
* Project:  JusTeam/client
*
* Module name: Discover Page
*
* Author: ANTD Motion, ZAHNG Yuechen
*
* Date created: 20180329
*
* Purpose: The Discover Page shows the components in 'antdm' folder (Generated
* by Antd Motion)
*
* Revision History:
*
* Date      Author          Ref    Revision
* 20180329  Julian          1      Component rearrangement.
*
**/
import React from 'react';
import ReactDOM from 'react-dom';
import { enquireScreen } from 'enquire-js';
import ScrollAnim from 'rc-scroll-anim';

import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Content4 from './Content4';
import Footer from './Footer';

import './less/antMotion_style.less';

const scrollScreen = ScrollAnim.scrollScreen;



export default class Home extends React.Component {

  render() {
    const children = [
      <Content0 id="content_10_0" key="content_10_0" />,
      <Content1 id="content_9_0" key="content_9_0" />,
      <hr className="inline"/>,
      <Content2 id="content_2_0" key="content_2_0" />,
      <hr className="inline"/>,
      <Content3 id="content_3_0" key="content_3_0" />,
      <hr className="inline"/>,
      <Content4 id="content_2_1" key="content_2_1"/>,
      <div style={{margin:'100px'}}/>,

    ];
    return (
      <div className="templates-wrapper">
        {children}
      </div>
    );
  }
}
