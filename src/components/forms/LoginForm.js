import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import React,{Component} from 'react'
import {Link} from'react-router-dom';
import 'antd/dist/antd.css'
const FormItem = Form.Item;

class LoginFormTemp extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success('Form received ：' + JSON.stringify(values, (k, v) => {
                    if (typeof v === 'undefined') {
                        return '';
                    }
                    return v;
                }));
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
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


const LoginForm=Form.create()(LoginFormTemp);

export default LoginForm;