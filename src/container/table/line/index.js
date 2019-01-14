import React, { Component } from 'react'
import echarts from 'echarts';
import ReactEcharts from "echarts-for-react";
import _ from 'lodash';
import { themeOne } from '../echartTheme';
import { withRouter } from "react-router-dom";
import DropList from '../DropList';
class Line extends Component{
    constructor(props){
        super(props);
        this.state={
            option: {
                tooltip: {//提示框组件的通用介绍
                    trigger: 'axis',//触发类型，‘axis’坐标轴触发，‘item’数据项图触发
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },

                xAxis: {
                    type: 'category',//坐标轴类型，'value' 数值轴，适用于连续数据。'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                    data: [] //横坐标数据 ，类目数据，在类目轴（type: 'category'）中有效。
                },
                yAxis: {
                    type: 'value',//同x坐标
                    axisLabel: {
                        formatter: '{value} M' //这里是单位
                    },

                },
                series: [],//图的类型，
                grid: { //视图个容器间距 等同于padding ，其中若top 的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐
                    top: 30,
                    bottom: 60,
                    left: 60,
                    right: 20
                },
                legend: {//图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
                    type: 'scroll',
                    orient: 'horizontal',
                    center: 0,
                    bottom: 10,
                },
            },
            onChartClick:function () {},
            viewId:"",   
            onBrushSelected: function () { },
            onContextmenu: function () { return false },

            dropPosition: { x: "0px", y: "0px" },
            dropData: [],
            isexist: false
        }
    }

    componentDidMount=()=>{
        const { xData,yData,aUnit,viewId} = this.props
        //将折线改成曲线
        let yyData = [];
        if(yData && yData.length > 0){
            yData.map((item)=>{
                if(item.type === "line"){
                    item.smooth = true;
                    return yyData.push(item);
                }else{
                    return yyData.push(item);
                }
            })
        };
        let onChartClick;
        let onBrushSelected;
        let onContextmenu;
        let brush = {};
        let toolbox = {};
        //选框事件判断
        if (!this.props.onBrushSelected) {
            onBrushSelected = function () { }
        } else {
            onBrushSelected = this.props.onBrushSelected
        }
        //点击判断
        if (!this.props.onChartClick) {
            onChartClick = function () { }
        } else {
            onChartClick = this.props.onChartClick
        }
        //点击右键事件判断
        if (!this.props.onContextmenu) {
            onContextmenu = function () { return false }
        } else {
            onContextmenu = this.props.onContextmenu
        }
        //判断是否有添加brush
        if (this.props.brush) {
            brush = {
                brush: {
                    toolbox: ['lineX', 'clear'],//选框类型
                    xAxisIndex: 'all',//对所有x轴有效
                    brushLink: 'all',//关联所有对象数据
                    brushMode: 'single',//启用单选模式
                    outOfBrush: { //选框透明度
                        colorAlpha: 0.1
                    },
                    brushStyle: { //选框样式
                        borderWidth: 1,
                        color: 'rgba(120,140,180,0.3)',
                        borderColor: 'rgba(120,140,180,0.8)'
                    },
                    throttleType: 'debounce',
                    throttleDelay: 300
                }
            }
        } else {
            brush = {}
        }
        //判断工具盒是否添加
        if (this.props.toolbox) {
            toolbox = {
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                }
            }
        } else {
            toolbox = {}
        }
        this.setState({
            option: Object.assign({}, { ...this.state.option }, {
                xAxis: {
                    data: xData //横坐标数据
                },
                yAxis: {
                    axisLabel: {
                        formatter: '{value}' + aUnit //这里是单位
                    }
                },
                animationThreshold: true,
                series: yyData
            },
                brush,
                toolbox
            ),
            onChartClick,
            viewId,
            onBrushSelected,
            onContextmenu
        })
    }
    componentWillReceiveProps(nextProps) {
        if (!(
            JSON.stringify(_.cloneDeep(this.props.xData)) === JSON.stringify(_.cloneDeep(nextProps.xData)) &&
            JSON.stringify(_.cloneDeep(this.props.yData)) === JSON.stringify(_.cloneDeep(nextProps.yData)) &&
            this.props.aUnit === nextProps.aUnit &&
            JSON.stringify(this.props.dropListInfo) === JSON.stringify(nextProps.dropListInfo)
        )) {
            const { xData, yData, aUnit } = nextProps
            //将折线改成曲线
            let yyData = []
            if (yData && yData.length > 0) {
                yData.map(item => {
                    if (item.type === 'line') {
                        item.smooth = true
                       return yyData.push(item)
                    } else {
                        return yyData.push(item)
                    }
                })
            }
            this.setState({
                option: Object.assign({}, { ...this.state.option }, {
                    xAxis: {
                        data: xData //横坐标数据
                    },
                    yAxis: {
                        axisLabel: {
                            formatter: '{value}' + aUnit //这里是单位
                        }
                    },
                    series: yyData
                }),
                dropPosition: nextProps.dropListInfo ? nextProps.dropListInfo.dropPosition : { x: "0px", y: "0px" },
                dropData: nextProps.dropListInfo ? nextProps.dropListInfo.dropData : [],
                isexist: nextProps.dropListInfo ? nextProps.dropListInfo.isexist : false
            })
        }
    } 
    render(){
        echarts.registerTheme("my_theme",themeOne);
        return(
            <div>
                <ReactEcharts
                    option={this.state.option}
                    theme="my_theme"
                    onEvents={{
                        'click': (params, viewId) => { this.state.onChartClick(params, this.state.viewId) },
                        'contextmenu': (params, viewId) => { this.state.onContextmenu(params, this.state.viewId) },
                        'brushSelected': (params, viewId) => { this.state.onBrushSelected(params, this.state.viewId) }
                    }}
                />
                <DropList
                    dropPosition={_.cloneDeep(this.state.dropPosition)}
                    dropData={_.cloneDeep(this.state.dropData)}
                    isexist={_.cloneDeep(this.state.isexist)} 
                    />
            </div>
        )
    }
}
export default withRouter(Line)