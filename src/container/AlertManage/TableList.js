/**
 * TableList选择表
 */
import React from 'react';
// import {
//     Link,
// // } from 'react-router-dom';
// import _ from 'lodash';
import {

    Button,
    // Breadcrumb,
    // Icon,
    Input,
    // Popconfirm,
    Row, Col, Table,
} from 'antd';
 
export default class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                key: '1',
                group_name: '胡彦斌',
                group_members: 32,
              }, {
                key: '2',
                group_members: '胡彦祖',
                group_name: 42,
              }],
            dataFilter: [],
            // listTable:[],
            Selected: [],
            currentPage: 1,
            dataCount:'',
            serachValue:"",
            selectedRowKeys:[],
        }
    }
     componentWillReceiveProps = () => {
         
        this.setState({
            selectedRowKeys:JSON.parse(localStorage.getItem('hasselectArr')),
            Selected: JSON.parse(localStorage.getItem('hasselectArr')),
         })
     }
         
     
    onSelectChange = (selectedRowKeys) => {
        var add = [];
        var dataValue = this.state.data;
        for (let i = 0; i < selectedRowKeys.length; i++) {
            if(dataValue){
        for(let  j = 0 ;j <dataValue.length; j++){
            if(dataValue[j].group_name === selectedRowKeys[i]){
            add.push(dataValue[j].group_name);
        }}
    }}

        this.setState({ selectedRowKeys }); 
        this.setState({
            Selected: add,
        })
    }
     
    onSearchHandler = (value) => {
        // 搜索框回车后处理函数
        // 主要就是使用lodash的filter从源数据是dataSource中过滤出dataFilter
        if (value) {
            // var newData = [];
            // var search = value;
            // newData = _.filter(dataValue, function (item) {
            //     console.log(item);
            //     return item.name.indexOf(search) >= 0;
            // });
            var tempFilterArr = [];
            this.state.data.map((item)=>{
                var tempStr = item.group_name+","+item.group_member;
                if(tempStr.match(value)){
                    //说明item 中有value的存在
                    tempFilterArr.push(item);
                }
                return "";
            });
            this.setState({
                dataFilter: tempFilterArr,
            });
        } else {
            // value是空了，表示不搜索了，那么就显示出全部数据
            this.setState(
                {
                    dataFilter: this.state.data,
                }
            );
        }
    }

    onChangeSearchInputValue=(event)=>{
        var value = event.target.value;
    // 搜索框回车后处理函数
        // 主要就是使用lodash的filter从源数据是dataSource中过滤出dataFilter
        if (value) {
            // var newData = [];
            // var search = value;
            // newData = _.filter(dataValue, function (item) {
            //     console.log(item);
            //     return item.name.indexOf(search) >= 0;
            // });
            var tempFilterArr = [];
            this.state.data.map((item)=>{
                var tempStr = item.group_name+","+item.group_member;
                if(tempStr.match(value)){
                    //说明item 中有value的存在
                    tempFilterArr.push(item);
                }
                return "";
            });
            this.setState({
                dataFilter: tempFilterArr,
            });
        } else {
            // value是空了，表示不搜索了，那么就显示出全部数据
            this.setState(
                {
                    dataFilter: this.state.data,
                }
            );
         
        
        }
    }

    handleTableChange = (pagination) => {
        // console.log(pagination, filters, sorter);
        var current_page = pagination.current;
        //  this.setState({
        //     currentPage:current_page,
        //  });
        var serachOption = this.state.serachValue;
         this.handleChange(current_page,serachOption);
    }
    // handleChange=(current_page,serachOption)=>{
    //     this.fetchHostData(current_page,serachOption);
    // }
    //确定按钮事件
    handleChangeValaues = () => {
        // newValue=this.state.Selected;
        this.props.selectedV({
            newValue: this.state.Selected,
            showVisible: false,
        });
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            // type: 'radio',
            onChange: this.onSelectChange,

        };

        // const hasSelected =selectedRowKeys.length >0;
        const columns = [{
            title: '用户组名',
            key: 'group_name',
            dataIndex: 'group_name',
            width: 400,
        }, {
            width:400,
            title: '组成员',
            key: 'group_members',
            dataIndex: 'group_members',
        }];

        const dataSource = [{
            key: '1',
            group_name: '胡彦斌',
            group_members: 32,
          }, {
            key: '2',
            group_members: '胡彦祖',
            group_name: 42,
          }];
        const hasSelected = this.state.Selected.length > 0;
        var selectedValue = this.state.Selected;
        // var dataValueSelected = this.state.dataFilter;
        return (
            <div className="content">
                <Row>
                    <Col span={12}>
                        <Input.Search
                            placeholder="search domain"
                            style={{ width: 470 }}
                            onSearch={this.onSearchHandler.bind(this)}
                            // onChange={this.onChangeSearchInputValue.bind(this)}
                            enterButton
                        />
                    </Col>
                </Row>

                <Table dataSource={dataSource} columns={columns} rowKey="group_name"
                    bordered={true} rowSelection={rowSelection}
                    pagination={{ pageSize:7 }}
                     
                    />
                <Input type='text' style={{ width: 400 }} disabled={!hasSelected} value={selectedValue}  />
                <Button type="primary" onClick={this.handleChangeValaues} disabled={!hasSelected}>确定</Button>
            </div>
        );
    }
}

