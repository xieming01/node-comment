import React,{Component} from 'react';
import { Radio, Popover, Button, } from 'antd';
import TimePickerView from "../datePicker/index";
import AlertManage from '../AlertManage/index'
import FlowStatus from '../FlowStatus/index'
import SnakeGame from '../Snake/idnex'
// import LineImg from './line'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class MyComponents extends Component{
    constructor(props){
        super(props);
        this.state={
            // value: moment('2017-01-25'),
            // selectedValue: moment('2017-01-25'),
            time_now: Date.parse(new Date()),//获取当前时间,Date.parse() 方法解析一个表示某个日期的字符串，并返回从1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的UTC时间）的毫秒数
            time_from: Date.parse(new Date()) - 24 * 3600000,//获取1天前时间,以毫秒为单位,
            // showBkgBtnFlag: '',
            visible: false,
            defaultBtnTag: "6",
            // displayFlag: false,
        }
    }
    // onSelect=(value)=>{
    //     this.setState({
    //         value:value,
    //         selectedValue: value,
    //     });
    // }
    // onPanelChange = (value) => {
    //     this.setState({ value });
    // }
    handleButtonClick = (value) => {
        var nameStr = value.target.value;
        var timestamp_now = Date.parse(new Date());//获取当前时间
        var timestamp_from = timestamp_now - 5 / 60 * 3600000;

        switch (nameStr) {
            case '1':
                //选择5分钟
                timestamp_from = timestamp_now - 5 / 60 * 3600000;
                break;
            case '2':
                //选择15分钟
                timestamp_from = timestamp_now - 15 / 60 * 3600000;
                break;
            case '3':
                //选择30分钟
                timestamp_from = timestamp_now - 30 / 60 * 3600000;
                break;
            case '4':
                //选择1小时
                timestamp_from = timestamp_now - 1 * 3600000;
                break;
            case '5':
                //选择2小时
                timestamp_from = timestamp_now - 2 * 3600000;
                break;
            case '6':
                //选择3小时
                timestamp_from = timestamp_now - 24 * 3600000;

                break;
            default:
                break;
        };
        this.setState({
            time_from: timestamp_from,
            time_now: timestamp_now,
            visible: false,
            defaultBtnTag: nameStr,
        });
    }

    /*TimeSelectPicker 返回数据后更新表格 */
    selectTimePickerAction = (event) => {
        if (event) {
            if (event.ation === '1') {
                //表示只点击自定义按钮 显示背景按钮
                this.setState({
                });
            } else {
                //点击确定，返回过滤数据，同时隐藏背景
                this.setState({
                    time_from: event.from,
                    time_now: event.to,
                    visible: false,
                });
            }
        }
    }
    //弹出框dateTimePickerView  
    handleVisibleChange = (visible) => {
        //判断是否已经展示弹出框，如果已经展示的话则关闭
        if (this.state.visible) {
            this.setState({
                visible: false,
                defaultBtnTag: "",
            });
        } else {
            //如果没有展示，则展示
            this.setState({
                visible: true,
                defaultBtnTag: "",
            });
        }
    }
    render(){
        const content = (
            <div style={{ width: "500px", height: "300px" }}>
                <TimePickerView selectTimePickerAction={this.selectTimePickerAction.bind(this)} />
            </div>
        );
        //datePicker弹出样式
        // var backgroundBtnStyle = {
        //     position: "fixed",
        //     width: "100%",
        //     height: "100%",
        //     backgroundColor: "1 1 1 0.1",
        //     top: "0px",
        //     display: this.state.visible ? "block" : "none",
        // }
        // const { value, selectedValue } = this.state;
        return(
            <div className="about" style={{   'margin': "10px 0  0 20px", "backgroundColor": "white"  }}>
                {/* <Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} style={{"backgroundColor":"white"}} />
                <Calendar value={value} onSelect={this.onSelect.bind(this)} onPanelChange={this.onPanelChange.bind(this)} fullscreen={false}/> */}
                <div  >
                    <RadioGroup onChange={this.handleButtonClick} size="large" value={this.state.defaultBtnTag}>
                        <RadioButton key="1" value="1">5分钟</RadioButton>
                        <RadioButton key="2" value="2">15分钟</RadioButton>
                        <RadioButton key="3" value="3">30分钟</RadioButton>
                        <RadioButton key="4" value="4">1小时</RadioButton>
                        <RadioButton key="5" value="5">2小时</RadioButton>
                        <RadioButton key="6" value="6">1天</RadioButton>
                        <Popover content={content}
                            trigger="click"
                            placement="bottomRight"
                            visible={this.state.visible}
                            // onMouseLeave={()=>{this.setState({visible: false})}}
                            // onMouseEnter={()=>{this.setState({visible: true})}}
                            >
                            <Button onClick={this.handleVisibleChange.bind(this)} style={{ borderRadius: "border-radius", float: "right", height: "40px", marginLeft: "-1px" }} >自定义</Button>
                        </Popover>
                    </RadioGroup>

                </div>
                {/*  */}
                <AlertManage/>
                <br/>
                <FlowStatus />

                <br/>
                <SnakeGame/>
            </div>
        )
    }
}