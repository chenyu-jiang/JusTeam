/**
* Project           : JusTeam/client
*
* Module name       : PostContentViewer
*
* Author            : XU Lu
*
* Date created      : 20180331
*
* Purpose           : Accept json as parameter, display a rich-text post
*
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
**/


import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import 'antd/dist/antd.css'
import ReactHtmlParser from 'react-html-parser';



const PostContentViewer=({content})=>{
    return(
        <div>
        {ReactHtmlParser( draftToHtml(content))}
       </div>
    );



}
export default PostContentViewer;
