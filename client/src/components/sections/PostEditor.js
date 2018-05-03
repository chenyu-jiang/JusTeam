/**
* Project           : JusTeam/client
*
* Module name       : PostEditor
*
* Author            : XU Lu
*
* Date created      : 20180331
*
* Purpose           : A rich-text editor using react-draft-wysiwyg and draft.js,
*                       for writing and submitting experiec posts.
*                        Supports markdown, hyperlinks, fonts, undo/redo,
*                      picture uploading (shares the api with user logo uploading)
*                      Uses Redux to fetch login status and current team.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180402    XU Lu        1      connect to backend post api
* 20180403    XU Lu        2      enable picture uploading
**/

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState,convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import{Button,message} from 'antd'
import {logIn, uploadImage} from '../../services/accountService'
import {sendNewPost} from '../../services/teamService'
import 'antd/dist/antd.css'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {connect} from "react-redux";



const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Write your post here!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};


const mapStateToProps=state=>{
    return{
        userID: state.userID,
        viewingTeamID:state.viewingTeamID,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        logInDispatch: userID=>{
            dispatch(logIn(userID));
        },

    }
}

class PostEditor extends Component {
    constructor(props) {
        super(props);
        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
            rootevent:props.eventID,
            teamID : props.teamID,
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
                       uploadImage(file).then((response)=>{
                           if(response.path) {
                               defresponse = {data: {link: response.path}}


                               resolve(defresponse);
                           }
                           if(response.error) {
                               defresponse={error: response.error}
                               reject(defresponse);
                           }
                       });



            }
        );
    }

    contentSubmit=()=>{
        if(this.state.rootevent) {
            console.log("submitting post:  " + JSON.stringify(this.state.contentState));
            sendNewPost(this.props.userID, this.props.viewingTeamID, this.state.rootevent, this.state.contentState)
                .then((response)=>{
                    if (response.status) {
                        if (response.postID) {
                            console.log("Post experience successful, postID= " + response.postID);
                        }
                    }
                    else {
                        let errormessage = "Failed to upload new post!";
                        if (response.error) errormessage = errormessage + "  Error: " + response.error;
                        message.error(errormessage);
                    }
                });

            // console.log("submitting json:  "+convertToRaw( this.state.contentState));
        }
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
export default connect(mapStateToProps,mapDispatchToProps)  (PostEditor);
