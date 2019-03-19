import React, { Component } from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
// import _ from 'lodash'
import { themeOne } from '../echartTheme'
// import DropList from '../DropList';
// import { Divider } from 'antd';
import contextList from '../ContextList'
 
var xAxisData = [];
var data1 = [];
var data2 = [];
for (var i = 0; i < 100; i++) {
    xAxisData.push('类目' + i);
    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
}

var option = {
    title: {
        text: '柱状图动画延迟'
    },
    legend: {
        data: ['bar', 'bar2'],
        align: 'left'
    },
    toolbox: {
        // y: 'bottom',
        feature: {
            magicType: {
                type: ['stack', 'tiled']
            },
            dataView: {},
            // saveAsImage: {
            //     pixelRatio: 2
            // }
        }
    },
    tooltip: {},
    xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
            show: false
        }
    },
    yAxis: {
    },
    series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay: function (idx) {
            return idx * 10 + 100;
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
}
class Bar extends Component {
  constructor(props) {
    super(props)  
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
//   componentDidMount() {
//     if (this.props.viewId) {
//       viewId = this.props.viewId
//     }
//     //点击事件判断
//     if (!this.props.onChartClick) {
//       onChartClick = function () { }
//     } else {
//       onChartClick = this.props.onChartClick
//     }
//     //点击事件判断
//     if (!this.props.onContextmenu) {
//       onContextmenu = function () { return false }
//     } else {
//       onContextmenu = this.props.onContextmenu
//     }
//     //判断工具盒是否添加
//     if (this.props.toolbox) {
//       toolbox = {
//         toolbox: {
//           feature: {
//             dataZoom: {
//               yAxisIndex: 'none'
//             },
//             restore: {},
//             saveAsImage: {}
//           }
//         }
//       }
//     } else {
//       toolbox = {}
//     }
       
//   }
  
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

export default Bar

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
