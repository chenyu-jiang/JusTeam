import { Form, Icon, Input, Button, Checkbox ,message,notification} from 'antd';
import React,{Component} from 'react'
import {Link,Redirect} from'react-router-dom';
import 'antd/dist/antd.css'
import {logIn} from '../../services/accountService'
import {connect} from 'react-redux'
const FormItem = Form.Item;

const mapStateToProps=state=>{
    return{
        userID: state.userID
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        logInDispatch: userID=>{
            dispatch(logIn(userID));
        }
    }
}
class LoginFormTemp extends Component {


    handleSubmit = (e) => {
        /*const store = this.context.store;
        const state=store.getState();*/

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //logIn(store,values.userID);

                /*message.success('Form received ：' + JSON.stringify(values, (k, v) => {
                    if (typeof v === 'undefined') {
                        return '';
                    }
                    return v;
                }));*/
                this.props.logInDispatch(values.userID);
                /*console.log('userID for dispatch:',values.userID)
                message.success('Get redux state:'+ JSON.stringify(this.props));
                const args = {
                    message: 'Data Received',
                    description: JSON.stringify(values),
                    duration: 5,
                };
                notification.open(args);
                console.log('Received values of form: ', values);*/
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        if(this.props.userID) return <Redirect to='/' />
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userID', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <Link to='/signUp'>
                    <Button type="primary">Sign up</Button>
                </Link>
                </FormItem>
            </Form>


        );
    }
}


const LoginForm=connect(mapStateToProps,mapDispatchToProps)(Form.create()(LoginFormTemp));


export default LoginForm;