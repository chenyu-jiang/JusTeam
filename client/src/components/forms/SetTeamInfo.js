import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select,
    Row, Col, Checkbox, Button, AutoComplete,
    DatePicker, TimePicker, Slider } from 'antd';
import '../pages/AccountInfoPage.css';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const RangePicker = DatePicker.RangePicker;
const {TextArea}=Input;
let uuid = 0;
function teamrange(value) {
    return `${(value+20)/10}`;
}

class RegistrationForm extends React.Component {
    //Dynamic FormItems.
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }


    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            // Should format date value before submit.
            const rangeValue = fieldsValue['timespan'];
            const values = {
                ...fieldsValue,
                'timespan': [rangeValue[0], rangeValue[1]],
            };

            console.log('Received values of form: ', JSON.stringify(values));
        });
    }


    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render() {
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const { autoCompleteResult } = this.state;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        const TitleConfig={
            rules:[{  required: true, message: 'Your group should have a name!',}],
        };
        const DesConfig={
            rules:[{  required: true, message: 'Your group should have a description to attract people.',}],
        };
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                span: 14,
                offset:6,
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

        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Activities' : ''}
                    required={false}
                    key={k}
                >

                    {getFieldDecorator(`names[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "You cannot create an empty activity.",
                        }],
                    })(
                        <Input placeholder="Timeline activity" style={{width:"68%", marginRight: 8}} />
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                    {getFieldDecorator(`dates[${k}]`,{
                        validateTrigger: ['onChange'],
                        rules: [{
                            required: true,
                            message: "Please pick a date",
                        }],
                    })(<DatePicker style={{marginRight: 8}}/>)}
                </FormItem>
            );
        });

        return (
            <div>
                <Col span={6}></Col>
                <h1 className="FormTitle"  >Create A Team！</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label= "Note: "
                    >
                        <span className="descirption">Please input some essential info to create your own project team!</span>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Team Title"
                    >
                        {getFieldDecorator('teamTitle', TitleConfig)(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Time Period"
                    >
                        {getFieldDecorator('timespan', rangeConfig)(
                            <RangePicker style={{width:"100%"}}/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
              Team Size&nbsp;
                                <Tooltip title="How many people do you want to form this team (including yourself)?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                        )}
                    >
                        {getFieldDecorator('teamSize')(
                            <Slider min={2} max={12} onChange={this.onChange} value={this.state.inputValue} step={1}
                                    marks={{ 2: '2', 4: '4', 6: '6', 8: '8', 10: '10', 12:'12'}} />
                        )}


                    </FormItem>
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                            <Icon type="plus" /> Add new activity...
                        </Button>
                    </FormItem>


                    <FormItem
                        {...formItemLayout}
                        label="Team Description"
                    >
                        {getFieldDecorator('description', DesConfig)(
                            <TextArea rows={6} />
                        )}
                    </FormItem>


                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Start your team!</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const SetTeamInfo = Form.create()(RegistrationForm);
export default SetTeamInfo;