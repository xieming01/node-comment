import React, { Component } from 'react'
import Line from './line'
import { wyAxiosPost } from './WyAxios'
import WySpin from './WySpin'
import {withRouter} from 'react-router-dom'
import { Divider } from "antd"
import Pie from './Pie'
import _ from 'lodash'
import $ from 'jquery'
import contextList from './ContextList'
import Bar from './Bar'
class LineView extends Component {
    constructor(props){
        super(props);
      this.state = {
        xData: [],
        yData: [],
        aUnit: '',
        isSpining: false,
        subTime: [],
        dropListInfo: {
            dropData: [],
            dropPosition: { x: "0px", y: "0px" },
            isexist: false
        }
    }  
}
    
    componentWillReceiveProps(nextProps) {
        if (!(
            JSON.stringify(this.props.subTime) === JSON.stringify(nextProps.subTime) &&
            this.props.field === nextProps.field
        )) {
            let info = Object.assign({}, nextProps.param, { dataType: 'host' }, { field: nextProps.field }, { start_time: nextProps.subTime[0] }, { last_time: nextProps.subTime[1] })
            this.setState({
                isSpining: true
            })
            wyAxiosPost('TwoView/getTwoLine', { info: info }, (result) => {
                const responseData = result.data.msg
                const subTime = []
                subTime.push(info.start_time)
                subTime.push(info.last_time)
                this.setState({
                    xData: responseData.xxx,
                    yData: responseData.yyy,
                    aUnit: responseData.unit,
                    isSpining: false,
                    subTime
                })
            })
        }
    }
    chartClick = (param) => {
        const flowPicTime = []
        flowPicTime.push(param.name)
        flowPicTime.push(param.name)
        this.props.resetTableData(flowPicTime)
    }
    brushSelect = (params) => {
        if (params.batch[0].areas.length > 0) {
            let flowPicTime = []
            const xxxRange = params.batch[0].areas[0].coordRange
            if (Math.abs(xxxRange[0]) === Math.abs(xxxRange[1])) {
                flowPicTime.push(this.state.xData[Math.abs(xxxRange[1])])
                flowPicTime.push(this.state.xData[Math.abs(xxxRange[1])])
            } else {
                flowPicTime.push(this.state.xData[Math.abs(xxxRange[0])])
                flowPicTime.push(this.state.xData[Math.abs(xxxRange[1])])
            }
            if (flowPicTime[1] === undefined) {
                flowPicTime[1] = this.state.xData[parseInt(this.state.xData.length - 1, 0)]
            }
            this.props.resetTableData(flowPicTime)
        }
    }
    tableContextmenu = (record, position, dom) => {
        // $('.amodule').removeClass('dropShow').addClass('dropHide')
        // $(document).click(() => {
        $('.drcontainer').removeClass('dropHide').addClass('dropShow');
        // })
        $(".MyPie").closest('.module-Body').find('.drcontainer').removeClass('dropHide').addClass('drop-Show')
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
                dropPosition: localStorage.getItem('position') ? JSON.parse(localStorage.getItem('position')) : {x: 0, y: 0},
                is_exist: true
            }
        })
    }
    render() {
        return (
            <div className="amodule--aa">
                <div className="moduleHeader" >
                    <h4>线性表</h4>
                    <Divider/>
                </div>
                <div className='con-tab'>
                <div className="moduleBody" >
                    <WySpin isSpining={this.state.isSpining}>
                        <Line
                            xData={this.state.xData ? this.state.xData : []}
                            yData={this.state.yData ? this.state.yData : []}
                            aUnit={this.state.aUnit}
                            onChartClick={this.chartClick}
                            brush={true}
                            onBrushSelected={this.brushSelect}
                        />
                    </WySpin>
                </div>
                <div className="module-Body">
                    
                    <Pie 
                        className='MyPie'
                        pieData={
                            [
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:274, name:'联盟广告'},
                                {value:235, name:'视频广告'},
                                {value:400, name:'搜索引擎'}
                            ] 
                        }
                        onChartClick={this.chartClick}
                        onContextmenu={this.tableContextmenu}
                        dropListInfo={_.cloneDeep(this.state.dropListInfo)}
                    />
                </div>
                    
                <div>
                    <Bar />
                </div>
                </div>
            </div>
        )
    }
}

export default LineView
