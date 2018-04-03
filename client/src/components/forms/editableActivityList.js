import { Table, Input, Popconfirm, Button, Icon } from 'antd';

import React,{Component}from 'react';



const TimeLine=[{key:'0',startTime:'2018.2.19', Location:'LSKLT',DoItem:'Do something1', Description:'I am so bad guy', Status:'finish',},

    {key:'1',startTime:'2018.2.19', Location:'LSKLT',DoItem:'Do something2', Description:'I am so bad guy', Status:'process',},

    {key:'2',startTime:'2018.2.19', Location:'LSKLT',DoItem:'Do something3', Description:'I am so bad gu', Status:'wait',},

    {key:'3',startTime:'2018.3.19', Location:'LSKLT',DoItem:'Do something4', Description:'I am so bad guy', Status:'wait',},

    {key:'4',startTime:'2018.4.14', Location:'LSKLT',DoItem:'ProjectDemo', Description:'I am so bad guy', Status:'wait',},

  ];



    class EditableCell extends React.Component {

      state = {

        value: this.props.value,

        editable: false,

      }

      handleChange = (e) => {

        const value = e.target.value;

        this.setState({ value });

      }

      check = () => {

        this.setState({ editable: false });

        if (this.props.onChange) {

          this.props.onChange(this.state.value);

        }

      }

      edit = () => {

        this.setState({ editable: true });

      }

      render() {

        const { value, editable } = this.state;

        return (

          <div className="editable-cell">

            {

              editable ?

                <div className="editable-cell-input-wrapper">

                  <Input

                    value={value}

                    onChange={this.handleChange}

                    onPressEnter={this.check}

                  />

                  <Icon

                    type="check"

                    className="editable-cell-icon-check"

                    onClick={this.check}

                  />

                </div>

                :

                <div className="editable-cell-text-wrapper">

                  {value || ' '}

                  <Icon

                    type="edit"

                    className="editable-cell-icon"

                    onClick={this.edit}

                  />

                </div>

            }

          </div>

        );

      }

    }



    class EditableTable extends React.Component {

      constructor(props) {

        super(props);

        this.columns = [{

          title: 'Name',

          dataIndex: 'DoItem',

          width: '30%',

          render: (text, record) => (

            <EditableCell

              value={text}

              onChange={this.onCellChange(record.key, 'Name')}

            />

          ),

        }, {

          title: 'Start Time',

          dataIndex: 'startTime',

          render: (text, record) => (

            <EditableCell

              value={text}

              onChange={this.onCellChange(record.key, 'Time')}

            />

          ),

        },

        {

          title: 'End Time',

          dataIndex: 'startTime',

          render: (text, record) => (

            <EditableCell

              value={text}

              onChange={this.onCellChange(record.key, 'Time')}

            />

          ),

        },

        {

          title: 'Location',

          dataIndex: 'Location',

          render: (text, record) => (

            <EditableCell

              value={text}

              onChange={this.onCellChange(record.key, 'Location')}

            />

          ),

        },{

          title: 'Description',

          dataIndex: 'Description',

          render: (text, record) => (

            <EditableCell

              value={text}

              onChange={this.onCellChange(record.key, 'Description')}

            />

          ),

        }, {

          title: 'operation',

          dataIndex: 'operation',

          render: (text, record) => {

            return (

              this.state.TimeLine.length > 1 ?

              (

                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>

                  <a href="#">Delete</a>

                </Popconfirm>

              ) : null

            );

          },

        }];



        this.state = {TimeLine:TimeLine,count:5,};

      }

      onCellChange = (key, dataIndex) => {

        return (value) => {

          const TimeLine = [...this.state.TimeLine];

          const target = TimeLine.find(item => item.key === key);

          if (target) {

            target[dataIndex] = value;

            this.setState({ TimeLine });

          }

        };

      }

      onDelete = (key) => {

        const TimeLine = [...this.state.TimeLine];

        this.setState({ TimeLine: TimeLine.filter(item => item.key !== key) });

      }

      handleAdd = () => {

        const { count, TimeLine } = this.state;

        const newData = {

          key: count,

          DoItem: "New Event",

          Time: "NULL",

          Description: "Type your description here...",

        };

        this.setState({

          TimeLine: [...TimeLine, newData],

          count: count + 1,

        });

      }

      render() {

        const { TimeLine } = this.state;

        const columns = this.columns;

        return (

          <div>

            <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>

            <Table bordered dataSource={TimeLine} columns={columns} />

          </div>

        );

      }

    }

export default EditableTable;
