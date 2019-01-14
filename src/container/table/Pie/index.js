import React, { Component } from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
// import _ from 'lodash'
import { themeOne } from '../echartTheme'
// import DropList from '../DropList';
// import { Divider } from 'antd';
import contextList from '../ContextList'

class Pie extends Component {
  constructor(props) {
    super(props)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      }
    };

    this.state = {
      option,
      onChartClick: function () { },
      viewId: '',
      onBrushSelected: function () { },
      onContextmenu: function () { return false },
      dropPosition: { x: "0px", y: "0px" },
      dropData:contextList({'listType':'host'})
    }
  }
  componentDidMount() {
    // console.log('didMount')
    const { pieData, name, title, unit } = this.props
    let onChartClick
    let onContextmenu
    let toolbox = {}
    let viewId = ''
    if (this.props.viewId) {
      viewId = this.props.viewId
    }
    //点击事件判断
    if (!this.props.onChartClick) {
      onChartClick = function () { }
    } else {
      onChartClick = this.props.onChartClick
    }
    //点击事件判断
    if (!this.props.onContextmenu) {
      onContextmenu = function () { return false }
    } else {
      onContextmenu = this.props.onContextmenu
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
        series: [
          {
            name: name,
            type: 'pie',
            radius: '80%',
            center: ['50%', '60%'],
            data: pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        title: {
          text: title,
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}" + unit + " ({d}%)"
        }
      },
        toolbox
      ),
      onChartClick,
      viewId,
      onContextmenu
    })
  }
  componentWillReceiveProps(nextProps) {
    if (
      !(
        JSON.stringify(this.props.pieData) === JSON.stringify(nextProps.pieData) &&
        this.props.title === nextProps.title &&
        this.props.name === nextProps.name &&
        this.props.unit === nextProps.unit
      )
    ) {
      // console.log("执行")
      const { pieData, name, title, unit } = nextProps
      this.setState({
        option: Object.assign({}, { ...this.state.option }, {
          series: [
            {
              name: name,
              type: 'pie',
              radius: '80%',
              center: ['50%', '60%'],
              data: pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, {
            title: {
              text: title,
              subtext: '',
              x: 'center'
            }
          }, {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}" + unit + " ({d}%)"
            }
          })
      })
    }
  }
  render() {
    echarts.registerTheme('my_theme', themeOne)
    //const viewId = this.state.viewId
    return (
      <div>
        <ReactEcharts
          option={this.state.option}
          theme="my_theme"
          onEvents={
            {
              'click': (params, viewId) => { this.state.onChartClick(params, this.state.viewId) },
              'contextmenu': (params, viewId) => { this.state.onContextmenu(params, this.state.viewId) },
            }
          }
          opts={{ renderer: 'canvas' }}
        />
        {/* <DropList
          dropPosition={_.cloneDeep(this.props.dropListInfo.dropPosition)}
          dropData={_.cloneDeep(this.state.dropData)}
          isexist={_.cloneDeep(this.props.dropListInfo.is_exist)}
        /> */}
      </div>

    )
  }
}

export default Pie

// /iewId 视图ID，通常指这个视图的这条数据ID
//name   string 指标名称
//title  string 饼图标题
//unit string 单位
//pieData  数组：[{
//                  name:'',value:
//                },{
//                  name:'',value:
//                }]

//toolbox  值为布尔值，是否开启工具盒 默认为false
//onChartClick  值为一个函数，默认为空
