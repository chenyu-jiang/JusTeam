import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState,convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import{Button} from 'antd'
import {uploadImage} from'../../services/accountService'

import 'antd/dist/antd.css'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Write your post here!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};



class PostEditor extends Component {
    constructor(props) {
        super(props);
        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
        }
    }

     uploadImageCallBack =(file)=> {
        return new Promise(
            (resolve, reject) => {
               /* const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
                const data = new FormData();
                data.append('image', file);
                console.log('image:   '+file);*/
                let defresponse = {data: {link:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVE-4_zEbt3e1kwojwImbB7cJjMxLBjG4M_O6RXisnxaY1jYul'}};
                       const response=uploadImage(file);
                       if(response.path) {
                           defresponse = {data: {link: response.path}}

                       }
                    resolve(defresponse);
                    if(response.error) {
                           defresponse={error: response.error}
                           reject(defresponse);
                    }


            }
        );
    }

    contentSubmit=()=>{
        console.log("submitting post:  "+JSON.stringify(this.state.contentState));
       // console.log("submitting json:  "+convertToRaw( this.state.contentState));
    }

    onContentStateChange= (contentState) => {
        this.setState({
            contentState,
        });
    };

    render() {

        return (
            <div>
                <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    toolbarStyle={{width:'100%'}}
                    editorStyle={{height:"250px",width:"100%"}}
                    onContentStateChange={this.onContentStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { uploadCallback: this.uploadImageCallBack,previewImage:true, alt: { present: true, mandatory: false } },
                    }}
                />
                <div style={{marginLeft:"90%"}}>
                <Button type="primary" onClick={this.contentSubmit}>Post!</Button>
                </div>
            </div>
        );
    }
}
export default PostEditor;