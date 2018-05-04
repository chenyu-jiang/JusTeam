/**
* Project:  JusTeam/client
*
* Module name: Join Application Form
*
* Author: ZHANG Yuechen
*
* Date created: 20180322
*
* Purpose: Using TextArea in antd to provide a method for user to send a join request
*
*
* Revision History:
*
* Date      Author       Ref   Revision
* 20180322  Julian       1     Construct a form with textArea.
* 20180402  Julian       2     Revise the form with the connection requirement of backend.
*
**/
import React, {Component}from 'react';
import {Row,Col,Button,Icon,Form,Input,message}from'antd';
import '../pages/AccountInfoPage.css';
import {connect} from 'react-redux'
import {applyForTeam} from '../../services/teamService';
const FormItem=Form.Item;
const {TextArea}=Input;
const mapStateToProps=state=>{
    return{
        userID: state.userID,
        viewingTeamID:state.viewingTeamID,
        toPath:state.toPath,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
       createTeamDispatch: teamID=>{
            dispatch({
                type:"SET_TEAMID",
                viewingTeamID:teamID,
            });
            dispatch({
                type:"SET_TOPATH",
                toPath:"/home/dash/myTeams/viewTeam"
            });
        },
       resetPathDispatch: ()=>{
           dispatch({
               type:"SET_TOPATH",
               toPath:"/null"
           });
       }
    }
}
class JoinRequests extends Component{
  handleSubmit = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err,fieldsValue)=>{
      if(err){
        return;
      }
      const joinreq = fieldsValue['inputdescription'];
      const values={
        application : fieldsValue,
        teamID:this.props.viewingTeamID,
      }
      const response = applyForTeam(values)
      if(response.status){
      if(response.state==='success'){
          console.log('join team successful')
          message('join team successful')
      }
      else{
        message.error('Failed to create, please retry!')

      }
    }
    if(response.error) console.log(response.error);
     console.log('Received values of form: ', JSON.stringify(values));
      console.log('Received values of form: ', joinreq);
    });
  }
  render(){
      const { getFieldDecorator,getFieldValue } = this.props.form;
    const DesConfig={
      rules:[{
        required:true, message:'You should write a description!'
      }],
    };
    const layout={
      labelCol: {
       span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const layoutbottom={
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return(
      <div>
        <br/>
        <div>
        <Form className="center" onSubmit={this.handleSubmit}>
        <FormItem
          {...layout}
          label="Team Description"
        >
          {getFieldDecorator('inputdescription', DesConfig)(
          <TextArea rows={6} />
          )}
        </FormItem>
        <FormItem {...layoutbottom}>
          <Button type="primary" htmlType="submit">Join!</Button>
        </FormItem>
        </Form>
        </div>
      </div>
    );
  }


}
const JoinRequest = connect(mapStateToProps,mapDispatchToProps)(Form.create()(JoinRequests));
export default JoinRequest;
