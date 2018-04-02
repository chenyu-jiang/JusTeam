import { Form, Icon, Input, Button, Checkbox ,message,notification} from 'antd';
import React,{Component} from 'react'
import {Link,Redirect} from'react-router-dom';
import 'antd/dist/antd.css'
import {logIn,logInAuth} from '../../services/accountService'
import {connect} from 'react-redux'
import passwordHash from 'password-hash'


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
        },

    }
}
class LoginFormTemp extends Component {


    handleSubmit = (e) => {
        /*const store = this.context.store;
        const state=store.getState();*/

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const hide=message.loading('Logging in...',0);
                console.log('ID:  '+values.userID+' password: '+passwordHash.generate(values.password));
                logInAuth(values.userID,passwordHash.generate(values.password)).then(
                    (response)=>{
                        if(response.error) message.error('Failed to login: '+response.error);
                        //else this.props.logInDispatch(values.userID);
                        hide();
                        this.props.logInDispatch(values.userID);
                    }
                )


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