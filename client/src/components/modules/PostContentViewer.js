import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import 'antd/dist/antd.css'
import ReactHtmlParser from 'react-html-parser';
const democontent = {"blocks":[{"key":"a28ti","text":"This is a demo Post.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":20,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fm13f","text":"here we have an image!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8srng","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1lhtf","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"2q8mg","text":"and 😀","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3bee4","text":"and colorful text","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":4,"length":13,"style":"color-rgb(209,72,65)"}],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVE-4_zEbt3e1kwojwImbB7cJjMxLBjG4M_O6RXisnxaY1jYul","height":"auto","width":"auto","alt":"hahahah"}}}}


const PostContentViewer=({content=democontent})=>{
    return(
        <div>
        {ReactHtmlParser( draftToHtml(content))}
       </div>
    );



}
export default PostContentViewer;
