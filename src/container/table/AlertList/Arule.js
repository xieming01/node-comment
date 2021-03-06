import React, { Component } from 'react'
import { Select, InputNumber, Popconfirm } from 'antd'
import _ from 'lodash'

import { netStandard, appStandard } from '../StandarConstant'
const Option = Select.Option
const liuliang = [
  {
    value: "b",
    name:"b"
  },{
    value: "Kb",
    name:"Kb"
  },{
    value: "Mb",
    name:"Mb"
  },{
    value: "Gb",
    name:"Gb"
  }
]
const cishu = [
  {
    value:'time',
    name:"次"
  },{
    value: "millionTime",
    name:"百万次"
  },{
    value: "billionTime",
    name:"亿次"
  }
]
const geshu = [
  {
    value: "count",
    name:"个"
  },{
    value: "millionCount",
    name:"百万个"
  },{
    value: "billionCount",
    name:"亿个"
  }
]
const shijian = [
  {
    value:"us",
    name:"微秒"
  },
  {
    value:"ms",
    name:"毫秒"
  },{
    value:"s",
    name:"秒"
  }
]
class Arule extends Component{
  state={
    id:'',

    standard: '',
    standard_opera:'',
    standard_val:'',
    standard_unit:'',
    standard_time:'',

    unitType:''
  }
  componentDidMount(){
    const {
      id,
      standard,
      standard_opera,
      standard_val,
      standard_unit,
      standard_time
    } = this.props.ruleData
    if(this.props.standarType === 'app' && standard !== ''){
      appStandard.map((item,index)=>{
        if(item.value === standard){
          this.setState({
            unitType: item.unitType
          })
          return
        }
      })
    }else if(this.props.standarType !== 'app' && standard !== ''){
      netStandard.map((item,index)=>{
        if(item.value === standard){
          this.setState({
            unitType: item.unitType,
          })
          return
        }
      })
    }
    this.setState({
      id,
      standard,
      standard_opera,
      standard_val,
      standard_unit,
      standard_time
    })
  }
  componentWillReceiveProps(nextProps){
    if(! _.isEqual(this.props.ruleData,nextProps.ruleData)){
      const {
        id,
        standard,
        standard_opera,
        standard_val,
        standard_unit,
        standard_time
      } = nextProps.ruleData
      this.setState({
        id,
        standard,
        standard_opera,
        standard_val,
        standard_unit,
        standard_time
      })
    }
  }
  standardChange = (value)=>{
    if(this.props.standarType === 'app'){
      appStandard.map((item,index)=>{
        if(item.value === value){
          this.setState({
            standard: value,
            unitType: item.unitType,
            standard_unit:''
          },()=>{
            this.setRule()
          })
          return
        }
      })
    }else{
      netStandard.map((item,index)=>{
        if(item.value === value){
          this.setState({
            standard: value,
            unitType: item.unitType,
            standard_unit:''
          },()=>{
            this.setRule()
          })
          return
        }
      })
    }
  }
  standard_operaChange = (value)=>{
    this.setState({
      standard_opera: value
    },()=>{
      this.setRule()
    })
  }
  standard_valChange = (value)=>{
    this.setState({
      standard_val: value
    },()=>{
      this.setRule()
    })
  }
  standard_unitChange = (value)=>{
    this.setState({
      standard_unit: value
    },()=>{
      this.setRule()
    })
  }
  standard_timeChange = (value)=>{
    this.setState({
      standard_time: value
    },()=>{
      this.setRule()
    })
  }
  generateStandardList = ()=>{
    const standardList = []
    if(this.props.standarType === 'app'){
      appStandard.map(item=>{
        standardList.push(
          <Option value={item.value} key={item.value} title={item.name} >{item.name}</Option>
        )
      })
    }else{
      netStandard.map(item=>{
        standardList.push(
          <Option value={item.value} key={item.value} title={item.name} >{item.name}</Option>
        )
      })
    }
    return standardList
  }
  generateUnitList = ()=>{
    const unitList = []
    if(this.state.unitType === 'flow'){
      liuliang.map(item=>{
        unitList.push(
          <Option value={item.value} key={item.value} title={item.name}>{item.name}</Option>
        )
      })
    }else if(this.state.unitType === 'count'){
      geshu.map(item=>{
        unitList.push(
          <Option value={item.value} key={item.value} title={item.name}>{item.name}</Option>
        )
      })
    }else if(this.state.unitType === 'time'){
      shijian.map(item=>{
        unitList.push(
          <Option value={item.value} key={item.value} title={item.name}>{item.name}</Option>
        )
      })
    }else if(this.state.unitType === 'cishu'){
      cishu.map(item=>{
        unitList.push(
          <Option value={item.value} key={item.value} title={item.name}>{item.name}</Option>
        )
      })
    }
    return unitList
  }
  deleteRule = ()=>{
    this.props.deleteRule(this.state.id)
  }
  setRule = ()=>{
    const {
      standard,
      standard_opera,
      standard_val,
      standard_unit,
      standard_time,
    } = this.state
    this.props.setRule(this.state.id,{
      standard,
      standard_opera,
      standard_val,
      standard_unit,
      standard_time,
    })
  }
  render(){
    return(
      <div style={{marginTop:"10px"}}>
        <Select style={{width:"160px"}} value={this.state.standard} onChange={this.standardChange}>
          {this.generateStandardList()}
        </Select>
        <Select style={{width:"80px"}} onChange={this.standard_operaChange} value={this.state.standard_opera}>
          <Option key=">" value=">">大于</Option>
          <Option key="<" value="<">小于</Option>
        </Select>
        <InputNumber min={0} style={{width:"80px"}} value={this.state.standard_val} onChange={this.standard_valChange} />
        <Select style={{width:"100px"}} value={this.state.standard_unit} onChange={this.standard_unitChange}>
          {this.generateUnitList()}
        </Select>
        <span>持续</span>
        <InputNumber min={0} style={{width:"80px"}} value={this.state.standard_time} onChange={this.standard_timeChange} />
        <span>min</span>

        <Popconfirm placement="topLeft" title={'确定要删除？'} onConfirm={this.deleteRule} okText="确定" cancelText="取消">
          <span style={{marginLeft: "10px",cursor:"pointer"}}><span><i className="fa fa-trash-o" aria-hidden="true"></i></span></span>
        </Popconfirm>
      </div>
    )
  }
}

export default Arule
