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
