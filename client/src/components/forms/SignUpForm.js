import React,{Component} from'react'

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,message,Card} from 'antd';

import {logIn, signUpSubmit} from '../../services/accountService'

import {connect} from 'react-redux'

import {Redirect}  from'react-router-dom'

const FormItem = Form.Item;

const Option = Select.Option;



const mapStateToProps=state=>{

    return{

        userID: state.userID,

    }

}



const mapDispatchToProps=dispatch=>{

    return{

        logInDispatch: userID=>{

            dispatch(logIn(userID));

        },



    }

}

class RegistrationForm extends Component {

    state = {



        confirmDirty: false,

        autoCompleteResult: [],

    };

    handleSubmit = (e) => {

        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {

               const formval={

                   userID:values.userID,

                   password:values.password,

                   nickname:values.nickname,

                   phone:values.phone ?(values.prefix+values.phone):undefined,

                   institution:values.institution,

                   major:values.major,

               }

                const hide=message.loading('Processing...',0);

                signUpSubmit(formval)

                    .then(response=>{

                        console.log('response received: '+JSON.stringify(response));

                        this.props.logInDispatch(values.userID);

                        hide();



                    });

                console.log('Received values of form: ', JSON.stringify(formval));



            }

        });

    }

    handleConfirmBlur = (e) => {

        const value = e.target.value;

        this.setState({ confirmDirty: this.state.confirmDirty || !!value });

    }

    compareToFirstPassword = (rule, value, callback) => {

        const form = this.props.form;

        if (value && value !== form.getFieldValue('password')) {

            callback('Two passwords that you enter is inconsistent!');

        } else {

            callback();

        }

    }

    validateToNextPassword = (rule, value, callback) => {

        const form = this.props.form;

        if (value && this.state.confirmDirty) {

            form.validateFields(['confirm'], { force: true });

        }

        callback();

    }



    render() {

        const { getFieldDecorator } = this.props.form;





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

        const prefixSelector = getFieldDecorator('prefix', {

            initialValue: '852',

        })(

            <Select style={{ width: 90 }}>

                <Option value="852">+852</Option>

                <Option value="86">+86</Option>

            </Select>

        );





        if(this.props.userID) return(<Redirect to='/' />)

        return (

          <div>

          <Card className="signup-form">

            <Form onSubmit={this.handleSubmit}>

                <FormItem

                    {...formItemLayout}

                    label="Username"

                >

                    {getFieldDecorator('userID', {

                        rules: [ {

                            required: true, message: 'Please input your username!',

                        }],

                    })(

                        <Input />

                    )}

                </FormItem>

                <FormItem

                    {...formItemLayout}

                    label="Password"

                >

                    {getFieldDecorator('password', {

                        rules: [{

                            required: true, message: 'Please input your password!',

                        }, {

                            validator: this.validateToNextPassword,

                        }],

                    })(

                        <Input type="password" />

                    )}

                </FormItem>

                <FormItem

                    {...formItemLayout}

                    label="Confirm Password"

                >

                    {getFieldDecorator('confirm', {

                        rules: [{

                            required: true, message: 'Please confirm your password!',

                        }, {

                            validator: this.compareToFirstPassword,

                        }],

                    })(

                        <Input type="password" onBlur={this.handleConfirmBlur} />

                    )}

                </FormItem>

                <FormItem

                    {...formItemLayout}

                    label={(

                        <span>

              Nickname&nbsp;

                            <Tooltip title="What do you want others to call you?">

                <Icon type="question-circle-o" />

              </Tooltip>

            </span>

                    )}

                >

                    {getFieldDecorator('nickname', {}

                       )(

                        <Input />

                    )}

                </FormItem>

                <FormItem

                    {...formItemLayout}

                    label="Phone Number"

                >

                    {getFieldDecorator('phone', {



                    })(

                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />

                    )}

                </FormItem>

                <FormItem

                    {...formItemLayout}

                    label="Current Institution"

                >

                    { getFieldDecorator('institution',{})

                    (<Input />)

                    }

                </FormItem>

                <FormItem

                    {...formItemLayout}

                    label="Major"

                >

                    { getFieldDecorator('major',{})

                    (<Input />)

                   }

                </FormItem>

                <FormItem {...tailFormItemLayout}>

                    {getFieldDecorator('agreement', {

                        valuePropName: 'checked',

                    })(

                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>

                    )}

                </FormItem>

                <FormItem {...tailFormItemLayout}>

                    <Button type="primary" htmlType="submit">Sign Up!</Button>

                </FormItem>

            </Form>

            </Card>

            </div>

        );

    }

}



const SignUpForm =connect(mapStateToProps,mapDispatchToProps)( Form.create()(RegistrationForm));

export default  SignUpForm;
