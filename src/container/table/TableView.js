import React, { Component } from 'react'
import { Select } from 'antd'
import _ from 'lodash'
import $ from 'jquery'
import contextList from './ContextList'
import MyTable from './MyTable'
import { wyAxiosPost } from './WyAxios'
// import WySpin from './WySpin'

const Option = Select.Option
class TableView extends Component {
    constructor(props){
        super(props);
        this.setSubTime = this.setSubTime.bind(this);
        // this.props = this.props.source;
       this.state = {
        subTime: [],
        xData: [],
        yData: [],

        initColumns: [],//原始title行
        standarList: ['ip', 'mac', 'hostname', 'bytes', 'packets', 'drops', 'rtt_in'],//被选中要显示的指标
        curLen: 7,//被选中指标的长度
        isSpining: false,
        pageSize: 5,
        dropListInfo: {
            dropData: [],
            dropPosition: { x: "0px", y: "0px" },
            isexist: false
        }
    } 
    }
    

    componentWillReceiveProps(nextProps) {
        if (!(
            JSON.stringify(this.props.subTime) === JSON.stringify(nextProps.subTime)
        )) {
            let info = Object.assign({}, nextProps.param, { dataType: 'host' }, { field: nextProps.field }, { start_time: nextProps.subTime[0] }, { last_time: nextProps.subTime[1] })
            this.setState({
                isSpining: true
            })
            
            wyAxiosPost('TwoView/getTwoTable', { info: {} }, (result) => {
                const responseData = result.data.msg
                const newxxx = []
                if (responseData.xxx && responseData.xxx.length > 0) {
                    responseData.xxx.forEach(item => {
                        newxxx.push(item);
                        // if (this.state.standarList.indexOf(item.key) !== -1) {
                        //       newxxx.push(item);
                        // }
                    })
                }
                const subTime = []
                subTime.push(info.start_time)
                subTime.push(info.last_time)
                this.setState({
                    initColumns: responseData.xxx,
                    xData: newxxx,
                    yData: responseData.yyy,
                    isSpining: false,
                    subTime
                })
            })

            
        }
    }

    
    standarChange = (value) => {
        this.setState({
            standarList: value,
            curLen: value.length
        }, () => {
            const newxxx = []
            if (this.state.initColumns && this.state.initColumns.length > 0) {
                this.state.initColumns.foreach(item => {
                    if (this.state.standarList.indexOf(item.key) !== -1) {
                       return  newxxx.push(item)
                    }
                })
                this.setState({
                    xData: newxxx
                })
            }
        })
    }
    setSubTime = (tableTime) => {
        this.setState({
            subTime: tableTime
        }, () => {
            // let info = Object.assign({}, this.props.param, { dataType: 'host' }, { field: this.props.field }, { start_time: this.state.subTime[0] }, { last_time: this.state.subTime[1] })
            this.setState({
                isSpining: true
            })
            wyAxiosPost('TwoView/getTwoTable', { info: {} }, (result) => {
                const responseData = result.data.msg
                const newxxx = []
                if (responseData.xxx && responseData.xxx.length > 0) {
                    responseData.xxx.forMap(item => {
                        newxxx.push(item);
                        // if (this.state.standarList.indexOf(item.key) !== -1) {
                        //      newxxx.push(item)
                        // }
                    })
                }
                this.setState({
                    initColumns: responseData.xxx,
                    xData: newxxx,
                    yData: responseData.yyy,
                    isSpining: false
                })
            })
        })
    }
    pageSizeChange = (current, size) => {
        this.setState({
            pageSize: size
        })
    }
    tableContextmenu = (record, position, dom) => {
        // $('.amodule').removeClass('dropShow').addClass('dropHide')
        // $(document).click(() => {
        $('.drcontainer').removeClass('dropHide').addClass('dropShow');
        // })
        $(".Mytable").closest('.moduleBody').find('.drcontainer').removeClass('dropHide').addClass('dropShow')
        let info = {
            listType: 'host',
            start_time: this.state.subTime[0],
            last_time: this.state.subTime[1],
            obj: record.ip,
            objType: 'host',
            previousPath: this.props.param.previousPath
        }
        this.setState({
            dropListInfo: {
                dropData: contextList(info),
                dropPosition: { x: position.x + "px", y: position.y - 460 + "px" },
                isexist: true
            }
        })
    }
    render() {
        return (
            <div className="amodule">
                <div className="moduleHeader">
                    <span style={{ float: "right" }}>
                        <span>指标显示：</span>
                        <Select
                            style={{ minWidth: "180px" }}
                            mode="tags"
                            size="small"
                            onChange={this.standarChange}
                            maxTagCount={0}
                            maxTagPlaceholder={() => ('已选' + this.state.curLen + '项')}
                            value={this.state.standarList}
                        >
                            {
                                this.state.initColumns && this.state.initColumns.length > 0 ?
                                    this.state.initColumns.map(item => {
                                        return (
                                            <Option key={item.key}>{item.title}</Option>
                                        )
                                    })
                                    :
                                    ''
                            }
                        </Select>
                    </span>
                </div>
                <div className="moduleBody">
                    {/* <WySpin isSpining={this.state.isSpining}> */}
                        <MyTable
                            xData={this.state.xData ? this.state.xData : []}
                            yData={this.state.yData ? this.state.yData : []}
                            // pageSize={this.state.pageSize}
                            // onShowSizeChange={this.pageSizeChange}
                            onTableContextmenu={this.tableContextmenu}
                            dropListInfo={_.cloneDeep(this.state.dropListInfo)}
                            className="Mytable"
                            // lo={()=>{this.setState({'isSpining':false})}}
                        />
                    {/* </WySpin> */}
                </div>
                
            </div>


        )
    }
}

export default   TableView
