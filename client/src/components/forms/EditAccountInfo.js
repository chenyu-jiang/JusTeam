import React,{Component} from'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,message,Card,Radio, Upload} from 'antd';
import {logIn, signUpSubmit,fetchActInfo,uploadImage} from '../../services/accountService'
import {connect} from 'react-redux'
import {Redirect}  from'react-router-dom'
const UserAccount= fetchActInfo() ;
const RadioGroup=Radio.Group;
const RadioButton=Radio.Button;
const FormItem = Form.Item;
const Option = Select.Option;
let imgurl=undefined;

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}
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
        UserAccount:{UserAccount},
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
<<<<<<< HEAD
               const formval={
                   userID:values.userID,
                   birthday:values.password,
                   nickname:values.nickname,
                   gender:values.gender,
                   photo:values.photo,
                   region:values.region,
                   introduction:values.introduction,
                   phone:values.phone ?(values.prefix+values.phone):undefined,
                   institution:values.institution,
                   email:values.email,
                   major:values.major,
               }
=======
                const formval={
                    photo:imgurl,
                    userID:values.userID,
                    birthday:values.password,
                    nickname:values.nickname,
                    gender:values.gender,
                    photo:values.photo,
                    region:values.region,
                    introduction:values.introduction,
                    phone:values.phone ?(values.prefix+values.phone):undefined,
                    institution:values.institution,
                    email:values.email,
                    major:values.major,
                }
>>>>>>> frontend
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
<<<<<<< HEAD
          normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
      }
=======
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
>>>>>>> frontend

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


<<<<<<< HEAD
        return (
          <div>
          <Card className="signup-form">
            <Form onSubmit={this.handleSubmit}>
                        <FormItem
                      {...formItemLayout}
                      label="Upload Avatar"
                    >
                      {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: uploadImage(),
                      })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                          <Button>
                            <Icon type="upload" /> Click to upload
                          </Button>
                        </Upload>
                      )}
                    </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="nickname"
                >
                    {getFieldDecorator('userID', {
                      initialValue: UserAccount.nickname,
                        rules: [ {
                            required: true, message: 'Please input your nickname!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Birthday"
                >
                    {getFieldDecorator('birthday', {
                      initialValue: UserAccount.birthday,
                        rules: [{
                            required: false, message: 'You can input your birthday in yyyy-mm-dd format.',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
          {...formItemLayout}
                    label="Gender"
                  >
                    {getFieldDecorator('radio-button',{initialValue:UserAccount.gender,})(
                      <RadioGroup>
                        <RadioButton value="male">Male</RadioButton>
                        <RadioButton value="female">Female</RadioButton>
                        <RadioButton value="other">Other</RadioButton>
                      </RadioGroup>
                    )}
                  </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Region"
                >
                    {getFieldDecorator('region', {initialValue:UserAccount.region,}
                       )(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                      initialValue:UserAccount.phone,
                    })(
                        <Input style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Current Institution"
                >
                    { getFieldDecorator('institution',{initialValue:UserAccount.institution})
                    (<Input />)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Major"
                >
                    { getFieldDecorator('major',{initialValue:UserAccount.major})
                    (<Input />)
                   }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Personal description"
                >
                    { getFieldDecorator('des',{initialValue:UserAccount.introduction})
                    (<Input />)
                   }
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Confirm</Button>
                </FormItem>
            </Form>
            </Card>
=======
        let uploading  = false;
        let statefile=undefined;
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                statefile=undefined;
            },
            beforeUpload: (file) => {
               statefile=file;
                return false;
            },
            file:statefile,
        };
      const handleUpload = () => {
              const  fileList  = statefile;
              uploading=true;
              // You can use any AJAX library you like
              const response=uploadImage(fileList);
              if(response.path) imgurl=response.path;
              console.log("imgurl=  ",imgurl);
          }

        return (
            <div>
                <Card className="signup-form">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="Upload Avatar"
                        >
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: uploadImage(),
                            })(
                                <div>
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload" /> Select File
                                        </Button>
                                    </Upload>
                                    <Button
                                        className="upload-demo-start"
                                        type="primary"
                                        onClick={handleUpload}
                                        disabled={statefile}
                                        loading={uploading}
                                    >
                                        {uploading ? 'Uploading' : 'Start Upload' }
                                    </Button>
                                </div>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="nickname"
                        >
                            {getFieldDecorator('userID', {
                                initialValue: UserAccount.nickname,
                                rules: [ {
                                    required: true, message: 'Please input your nickname!',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Birthday"
                        >
                            {getFieldDecorator('birthday', {
                                initialValue: UserAccount.birthday,
                                rules: [{
                                    required: false, message: 'You can input your birthday in yyyy-mm-dd format.',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Gender"
                        >
                            {getFieldDecorator('radio-button',{initialValue:UserAccount.gender,})(
                                <RadioGroup>
                                    <RadioButton value="male">Male</RadioButton>
                                    <RadioButton value="female">Female</RadioButton>
                                    <RadioButton value="other">Other</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Region"
                        >
                            {getFieldDecorator('region', {initialValue:UserAccount.region,}
                            )(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Phone Number"
                        >
                            {getFieldDecorator('phone', {
                                initialValue:UserAccount.phone,
                            })(
                                <Input style={{ width: '100%' }} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Current Institution"
                        >
                            { getFieldDecorator('institution',{initialValue:UserAccount.institution})
                            (<Input />)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Major"
                        >
                            { getFieldDecorator('major',{initialValue:UserAccount.major})
                            (<Input />)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Personal description"
                        >
                            { getFieldDecorator('des',{initialValue:UserAccount.introduction})
                            (<Input />)
                            }
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Confirm</Button>
                        </FormItem>
                    </Form>
                </Card>
>>>>>>> frontend
            </div>
        );
    }
}

const EditAccountInfo =connect(mapStateToProps,mapDispatchToProps)( Form.create()(RegistrationForm));
export default  EditAccountInfo;
