import React, { Component } from 'react'
import { Table,Divider } from 'antd'
import _ from 'lodash'
import DropList from '../DropList'
import sortColumns from '../TableSort'
import MultilevelFilter from '../../AlertManage/MultilevelMenu/MultilevelFilter'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a  >{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },   {
    title: '分类',
    dataIndex: 'tags',
    key: 'tags',
},{
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a  >Invite {record.name}</a>
        <Divider type="vertical" />
        <a  >Delete</a>
      </span>
    ),
  }]
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }]
class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xData: columns,//表头
            yData: data,//表格数据
            onTableClick: function () { },
            onTableContextmenu: function () { },
            dropPosition: { x: "0px", y: "0px" },
            dropData: [],
            isexist: false,
            filterDropdownVisible:false
        }
    }
    componentDidMount() {
        const { xData, yData } = this.props
        let onTableClick
        let onTableContextmenu
        //点击事件判断
        if (!this.props.onTableClick) {
            onTableClick = function () { }
        } else {
            onTableClick = this.props.onTableClick
        }
        //右键点击事件判断
        if (!this.props.onTableContextmenu) {
            onTableContextmenu = function () { }
        } else {
            onTableContextmenu = this.props.onTableContextmenu
        }
        this.setState({
            xData: sortColumns(xData),
            yData: yData,
            onTableClick,
            onTableContextmenu
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.activeRowKey) {
            if (!(
                JSON.stringify(_.cloneDeep(this.props.xData)) === JSON.stringify(_.cloneDeep(nextProps.xData)) &&
                JSON.stringify(_.cloneDeep(this.props.yData)) === JSON.stringify(_.cloneDeep(nextProps.yData)) &&
                this.props.activeRowKey === nextProps.activeRowKey &&
                JSON.stringify(this.props.dropListInfo) === JSON.stringify(nextProps.dropListInfo)
            )) {
                this.setState({
                    xData: sortColumns(nextProps.xData),
                    yData: [...nextProps.yData],
                    dropPosition: nextProps.dropListInfo ? nextProps.dropListInfo.dropPosition : { x: "0px", y: "0px" },
                    dropData: nextProps.dropListInfo ? nextProps.dropListInfo.dropData : [],
                    isexist: nextProps.dropListInfo ? nextProps.dropListInfo.isexist : false
                })
            }
        } else {
            if (!(
                JSON.stringify(_.cloneDeep(this.props.xData)) === JSON.stringify(_.cloneDeep(nextProps.xData)) &&
                JSON.stringify(_.cloneDeep(this.props.yData)) === JSON.stringify(_.cloneDeep(nextProps.yData)) &&
                JSON.stringify(this.props.dropListInfo) === JSON.stringify(nextProps.dropListInfo)
            )) {
                this.setState({
                    xData: sortColumns(nextProps.xData),
                    yData: [...nextProps.yData],
                    dropPosition: nextProps.dropListInfo ? nextProps.dropListInfo.dropPosition : { x: "0px", y: "0px" },
                    dropData: nextProps.dropListInfo ? nextProps.dropListInfo.dropData : [],
                    isexist: nextProps.dropListInfo ? nextProps.dropListInfo.isexist : false
                })
            }
        }
    }

     /**
     * 自定义筛选确定事件
     */
    handleMenuSumbitClick=(values)=>{
        //  console.log(values);
        var currentPage = 1;
        var idArr = [];
        for (let index = 0; index < values.length; index++) {
            const tempObj = values[index];
            idArr.push(tempObj.value);
        }
        // var category = "category="+idArr.join(",");
        // var url = `/cmdb/host/list?page=${currentPage}`;
        // url = `${url}&${category}`;

        //  this.props.history.push(url);
         this.setState({
            filterDropdownVisible:false,
         });
    }
    /**
     * 自定义筛选重置事件
     */
    handleMenuResetClick=(values)=>{
        // console.log(values);
        // var url = `/cmdb/host/list?page=${1}`;
        //  this.props.history.push(url);
         this.setState({
            filterDropdownVisible:false,
         });
    }
    

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a  >{text}</a>,
          }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },   {
            title: '分类',
            dataIndex: 'tags',
            key: 'tags',
            // 接着定义filterMultiple, onFilter, sorter
            // sorter: (a, b) => a.category - b.category,
            // filters: this.state.categoryFilters,
            // filterMultiple: true,            
            // filteredValue: this.state.category ? this.state.category.toString().split(',') : [],
            // filterIcon: <Icon type="default" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
        
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    
                        <MultilevelFilter  handleMenuSumbitClick={this.handleMenuSumbitClick.bind(this)} handleMenuResetClick={this.handleMenuResetClick.bind(this)}></MultilevelFilter>
                </div>
            ),
            // onFilter: (value, record) => record.category.indexOf(value) === 0,
            filterDropdownVisible:this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                  filterDropdownVisible: visible,
                });
              },
        },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <a  >Invite {record.name}</a>
                <Divider type="vertical" />
                <a  >Delete</a>
              </span>
            ),
          }]
        return (
            <div>
                <Table
                    size="small"
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: this.props.pageSize ? this.props.pageSize : 5,
                        pageSizeOptions: ["5", "10", "20", "30", "40"],
                        showSizeChanger: true,
                        showQuickJumper: true,
                        onShowSizeChange: this.props.onShowSizeChange ? (current, size) => this.props.onShowSizeChange(current, size) : function () { }
                    }}
                    rowSelection={this.props.rowSelection ? this.props.rowSelection : undefined}

                    onRow={(record) => {
                        return {
                            onClick: () => { this.state.onTableClick(record) },
                            onContextMenu: (event) => {
                                let e = event || window.event
                                const xPosition = e.clientX
                                const yPosition = e.clientY
                                const position = {
                                    x: xPosition,
                                    y: yPosition
                                }
                                const dom = e.target
                                this.props.onTableContextmenu(record, position, dom)
                                // localStorage.setItem('position',JSON.stringify(position))
                                // this.setState({dropPosition: position })
                            }
                        }
                    }
                    }>
                </Table>
                <DropList
                    dropPosition={_.cloneDeep( this.state.dropPosition)}
                    dropData={_.cloneDeep(this.state.dropData)}
                    isexist={_.cloneDeep(this.state.isexist)}
                />
            </div>
        ) 
    }
}

export default MyTable


//columns:[], 表格列对象
//data:[], 表格列数据
//onTableClick: function(){}, 表格行点击事件
//onTableContextmenu: function(){} 表格行右键事件
