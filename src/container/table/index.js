import React, { Component } from 'react'
import { Row, Col, Select } from 'antd'
import _ from 'lodash'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'

import LineView from './LineView'
import TableView from './TableView'
import WyDatePicker from './WyDatePicker'
import { netStandard } from './StandarConstant'
import "./style.css"

const Option = Select.Option
class MyTableList extends Component {
    constructor(props){
        super(props);
        // this.subTable= null;
        //屏蔽右键，设置右键弹框状态
        window.document.oncontextmenu = (event) => {
            let e = event || window.event
            e.preventDefault()
            e.stopPropagation()
        };
       this.state = {
        field: 'bytes',
        allTime: [],
        param: {},
        allPath: ''
    } 
    }
    
    componentDidMount() {
        
        const param =  {
            "listType": "netmouth", "start_time": "2018-11-15 15:49", "last_time": "2018-11-15 16:49", "obj": "eno4", "objType": "iface", "previousPath": "/app/net/netallelement"} 
        const allTime = []
        allTime.push(param.start_time)
        allTime.push(param.last_time)
        this.setState({
            allTime,
            param
        });
        $(document).click(() => {
            $('.drcontainer').removeClass('dropShow').addClass('dropHide')
        })
    }
    allTimeChange = (value) => {
        this.setState({
            allTime: value
        })
    }
    fieldChange = (value) => {
        this.setState({
            field: value
        })
    }
    //控制table的props
    resetTableData = (tableTime) => {
        console.log(this);
        this.subTable.setSubTime(tableTime)
    }
    // doNothing = () => {
    //     window.event.returnValue = false;
    //     return false;

    // }  
 
    
    render() {
        
        return (
            <div style={{ "backgroundColor": "#fff", }}className="article">
                <Row gutter={16}>
                    <Col>
                        <div className="amodule" style={{ padding: "0 20px 0 20px", lineHeight: "60px" }}>
                            <span style={{ marginRight: "20px" }}>
                                <span>全局时间：</span><WyDatePicker curTime={this.state.allTime} rangeTimeChange={this.allTimeChange} size="default" style={{ maxWidth: "280px" }} />
                            </span>
                            <span>
                                <span>指标：</span>
                                <Select value={this.state.field} onChange={this.fieldChange} style={{ minWidth: "180px" }}>
                                    {
                                        netStandard && netStandard.length > 0 ?
                                            netStandard.map(item => {
                                                return (
                                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                                )
                                            })
                                            :
                                            ''
                                    }
                                </Select>
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16} >
                    <Col>
                        <LineView resetTableData={this.resetTableData}  subTime={_.cloneDeep(this.state.allTime)} param={_.cloneDeep(this.state.param)} field={this.state.field} />
                    </Col>
                </Row>
                <Row gutter={16} className="table_" style={{"margin":"20px 0px 0px 0px"}}>
                    <Col>
                        <TableView ref={(constance) => { this.subTable = constance }} subTime={_.cloneDeep(this.state.allTime)} param={_.cloneDeep(this.state.param)}  />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(MyTableList)
