import React from 'react';
import { Button, DatePicker, TimePicker, Row, Col, message,} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import './datepicker.less';
const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';
export default class TimePickerView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateTime_from:this.dateToString(new Date()),//开始时间
            dateTime_to:this.dateToString(new Date()),//结束时间
            time_from:'00:00',
            time_to:'00:00',
            showFlag:false,
        }
    }
    componentDidMount=()=>{
        $('.ant-time-picker-panel-input-wrap').addClass("inputText");
        $('.ant-time-picker-panel-select').addClass('liText');
    }
    dateToString =(d)=> {  
        var dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate().toString();  
        var mmm = d.getMonth()< 10 ? "0"+ (d.getMonth()+1) :(d.getMonth()+1);  
        var yyyy = d.getFullYear().toString(); //2011  
        return yyyy+'-'+mmm+'-'+dd;
    } 

    //快捷方式
    selectTime=(value)=>{
        // console.log(value);
        var timestamp_now = Date.parse(new Date());//获取当前时间
        var timestamp_from = timestamp_now - 5/60 * 3600000;
        switch(value){
            case "1":
                //5分钟
                timestamp_from = timestamp_now - 5/60 * 3600000;
                break;
            case "2":
                //15分钟
                timestamp_from = timestamp_now - 15/60 * 3600000;
                break;
            case "3":
                //30分钟
                timestamp_from = timestamp_now - 30/60 * 3600000;
                break;
            case "4":
                //1小时
                timestamp_from = timestamp_now - 1 * 3600000;
                break;
            case "5":
                //2小时
                timestamp_from = timestamp_now - 2 * 3600000;
                break;
            case "6":
                timestamp_from = timestamp_now - 3 * 3600000;
                //3小时
                break;
            case "7":
                //6小时            
                timestamp_from = timestamp_now - 6 * 3600000;
                break;
            case "8":
                //12小时
                timestamp_from = timestamp_now - 8 * 3600000;
                break;

            case "9":
                //1天
                timestamp_from = timestamp_now - 24 * 3600000;
                break;
            case "10":
                //2天
                timestamp_from = timestamp_now - 2*24 * 3600000;
                break;
            case "11":
                //3天
                timestamp_from = timestamp_now - 3*24 * 3600000;
                break;
            case "12":
                //7天
                timestamp_from = timestamp_now - 7*24 * 3600000;
                break;
            case "13":
                //10天
                timestamp_from = timestamp_now - 10*24 * 3600000;
                break;
            case "14":
                //15天
                timestamp_from = timestamp_now - 15*24 * 3600000;
                break;
            case "15":
                //20天
                timestamp_from = timestamp_now - 20*24 * 3600000;
                break;
            case "16":
                //30天
                timestamp_from = timestamp_now - 30*24 * 3600000;
                break;

            default:
                break;
        }
        
        this.props.selectTimePickerAction({"ation":"0","showFlag":false,"from":timestamp_from,"to":timestamp_now});
            this.setState({
                showFlag:false,
            });
    }


    //确定
    selectTimeBtnConfig=()=>{
        let date_from = typeof this.state.dateTime_from === 'string' ? this.state.dateTime_from : this.state.dateTime_from._d.getFullYear() + "-" + (this.state.dateTime_from._d.getMonth() + 1) + "-" + this.state.dateTime_from._d.getDate();
        let date_to = typeof this.state.dateTime_to === 'string' ? this.state.dateTime_to : this.state.dateTime_to._d.getFullYear() + "-" + (this.state.dateTime_to._d.getMonth() + 1) + "-" + this.state.dateTime_to._d.getDate();

        var fromStr = date_from+" "+this.state.time_from;
        var toStr = date_to+" "+this.state.time_to;

        //转成date格式
        var fromDate = new Date(fromStr);
        var toDate = new Date(toStr);
        //比较date大小
       var from1970 =  Date.parse(fromDate);//获取开始时间
       var to1970 =  Date.parse(toDate);//获取结束时间
        if(to1970 <= from1970){
            message.error("开始时间必须小于结束时间");
        }else{
            this.props.selectTimePickerAction({"ation":"0","showFlag":!this.state.showFlag,"from":fromStr,"to":toStr});
            this.setState({
                showFlag:false,
            })
        }
    }

    //重置
    resetTimeBtnConfig=()=>{
        this.setState ({
            dateTime_from:this.dateToString(new Date()),
            dateTime_to:this.dateToString(new Date()),
            time_from:'00:00',
            time_to:'00:00',
        })
    }

    //选择日期picker
    selectDatePicker = (paramID,  dateString) => {
        switch (paramID) {
            case "1":
                //from 日期选择器
                this.setState({
                    dateTime_from: dateString,
                });
                break;
            case "2":
                //to 日期选择器
                this.setState({
                    dateTime_to: dateString,
                })
                break;
            default:
                break;
        }
    }

    //时间选择器返回
    selectTimePicker=(paramID,event)=> {
        switch (paramID) {
            case "1": 
                //from 时间选择器
                this.setState({
                    time_from: event ?  event.format(timeFormat) : "00:00" ,
                });            
                break;
            case "2": 
                //to 时间选择器
                this.setState({
                    time_to: event ? event.format(timeFormat) : "00:00",
                });
           
                break;
            default:
                break;
        }
    }

    render() {
        const contentt = {
            width: "500px",
            height: "300px",
            borderWidth:1,
            backgroundColor: "#fefefe",
            // border: "1px solid #dddde4",
        }
        const rowStyle={
            height:"34px",
        }
        return (
                <div style={contentt} >
                    <div>
                    <div  style={{ height: "100%", width: "70%", float: "left", textAlign: "left" }} >
                        <p style={{ "fontSize": "15px" }}>自定义范围</p>
                        <div>
                            <p style={{ "marginBottom": "5px" }}>开始时间</p>
                            <DatePicker 
                                format={dateFormat}
                                size="large" style={{ width: "155px" }}  
                                // defaultValue={moment(new Date(), dateFormat)}
                                value={moment(this.state.dateTime_from, dateFormat)}
                                onChange={this.selectDatePicker.bind(this,"1")}
                                placeholder="请选择开始日期"
                                />
                                &nbsp;&nbsp;
                                
                            <TimePicker 
                                onChange={this.selectTimePicker.bind(this,"1")} 
                                value={moment(this.state.time_from, timeFormat)} 
                                format={timeFormat}
                                size="large" 
                                // placeholder="请选择开始时间"
                                // style={{ width: "155px" }}
                                />
                        </div>
                        <br />
                        <div>
                            <p style={{ "marginBottom": "5px" }}>结束时间</p>
                            <DatePicker 
                                format={dateFormat}
                                size="large" 
                                style={{ width: "155px" }}  
                                // defaultValue={moment(new Date(), dateFormat)}
                                value={moment(this.state.dateTime_to, dateFormat)}
                                onChange={this.selectDatePicker.bind(this,"2")}
                                placeholder="请选择结束日期"
                                />&nbsp;&nbsp;
                            <TimePicker 
                                value={moment(this.state.time_to, timeFormat)}
                                // defaultValue={moment('00:00', timeFormat)} 
                                // defaultOpenValue={moment('01:00', 'HH:mm')}
                                format={timeFormat}
                                onChange={this.selectTimePicker.bind(this,"2")} 
                                size="large"
                                // placeholder="请选择结束时间"
                                // style={{ width: "155px" }}
                                />
                            <br />
                        </div>
                        <br />
                        <div>
                            <Button onClick={()=>this.resetTimeBtnConfig()}  style={{ width: "90px", height: "36px", margin: "10px", float: "left" }}>重置</Button>
                            <p style={{ width: "20px", float: "left" }}></p>
                            <Button onClick={()=>this.selectTimeBtnConfig()} type="primary" style={{ width: "90px", height: "36px", margin: "10px", float: "left" }}>确定</Button>

                        </div>
                    </div>
                    <div style={{ height: "100%", width: "30%", textAlign: "center", float: "right", paddingTop: "20px" }} >

                        <Row>
                            <Col span={12}>
                                <Row style={rowStyle}><a  onClick={this.selectTime.bind(this,"9")}>1天</a></Row>
                                <Row style={rowStyle}><a  onClick={this.selectTime.bind(this,"10")}>2天</a></Row>
                                <Row style={rowStyle}><a  onClick={this.selectTime.bind(this,"11")}>3天</a></Row>
                                <Row style={rowStyle}><a  onClick={this.selectTime.bind(this,"12")}>7天</a></Row>
                                <Row style={rowStyle}><a  onClick={this.selectTime.bind(this,"13")}>10天</a></Row>
                                <Row style={rowStyle}><a  onClick={this.selectTime.bind(this,"14")}>15天</a></Row>
                                <Row style={rowStyle}><a  onClick={this.selectTime.bind(this,"15")}>20天</a></Row>
                                <Row style={rowStyle}><a  onClick={this.selectTime.bind(this,"16")}>30天</a></Row>

                            </Col>
                            <Col span={12}>
                            <Row style={rowStyle}><a onClick={this.selectTime.bind(this,"1")}>5分钟</a></Row>
                            <Row style={rowStyle}><a onClick={this.selectTime.bind(this,"2")}>15分钟</a></Row>
                            <Row style={rowStyle}><a onClick={this.selectTime.bind(this,"3")}>30分钟</a></Row>
                            <Row style={rowStyle}><a onClick={this.selectTime.bind(this,"4")}>1小时</a></Row>
                            <Row style={rowStyle}><a onClick={this.selectTime.bind(this,"5")}>2小时</a></Row>
                            <Row style={rowStyle}><a onClick={this.selectTime.bind(this,"6")}>3小时</a></Row>
                            <Row style={rowStyle}><a onClick={this.selectTime.bind(this,"7")}>6小时</a></Row>
                            <Row style={rowStyle}><a onClick={this.selectTime.bind(this,"8")}>12小时</a></Row>
                            </Col>
                        </Row>


                    </div>
                </div>
                </div>
       
          
        );
    }
}
 