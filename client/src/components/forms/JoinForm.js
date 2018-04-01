import React, {Component}from 'react';
import {Row,Col,Button,Icon,Form,Input}from'antd';
import '../pages/AccountInfoPage.css';
const FormItem=Form.Item;
const {TextArea}=Input;
class JoinRequests extends Component{
  handleSubmit = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err,fieldsValue)=>{
      if(err){
        return;
      }
      const joinreq = fieldsValue['inputdescription'];
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
      This is a JoinRequest of a Team.
        <div>
        <Form>
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
const JoinRequest = Form.create()(JoinRequests);
export default JoinRequest;
