/**
* Project:  JusTeam/client
*
* Module name: Edit Team Form
*
* Author: ZHANG Yuechen
*
* Date created: 20180320
*
* Purpose: Using TextArea in antd to provide a method for user to revise team information
*
* Revision History:
*
* Date      Author       Ref   Revision
* 20180320  Julian       1     Construct a form with textArea.
* 20180403  Julian       2     Revise the form with the connection requirement of backend.
*
**/
import React,{Component} from'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,message} from 'antd';
import {logIn, signUpSubmit,fetchActInfo} from '../../services/accountService'
import {editTeam,getUserTeams,viewOneTeam} from '../../services/teamService'
import {connect} from 'react-redux'
import {Redirect}  from'react-router-dom'
import RootReducer from '../../reducers/index'
const FormItem = Form.Item;
const {TextArea}= Input;

//const viewTeam = viewOneTeam(teamID);
class EditTeamInfo1 extends Component{
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
            return;
        }
        const values={
          introduction:fieldsValue.introduction,
          reminder:fieldsValue.reminder,
        };
        const response= editTeam(values);
        if(response.status){
            if(response.status === 'success') {
                console.log('create team successful')
            }
            else {
               message.error('Failed to create, please retry!')
            }
        }
        if(response.error) console.log(response.error);
         console.log('Received values of form: ', JSON.stringify(values));
      });
  }
  render(){
  const { getFieldDecorator} = this.props.form;
  const formItemLayout = {
      labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
      },
      wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
      },
  };
  const tailFormItemLayout = {
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

  getFieldDecorator('keys', { initialValue: [] });
    return(

      <Form>
      <FormItem
          {...formItemLayout}
          label="Team Description"
      >
          {getFieldDecorator('description', {initialValue:"ss",})(
              <TextArea rows={6} />
          )}
      </FormItem>
      <FormItem
          {...formItemLayout}
          label="Announcement"
      >
          {getFieldDecorator('announcement',  {initialValue:"ss",})(
              <TextArea rows={6} />
          )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Confirm</Button>
      </FormItem>
      </Form>
    );
    }
}
const EditTeamInfo = Form.create()(EditTeamInfo1);
export default EditTeamInfo;
