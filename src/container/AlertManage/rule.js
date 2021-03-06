import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Row, Col, Select, Button, Input, Icon, Form, Popconfirm, message } from 'antd';
import './timeselect.css'
const rules = [{ "key": "all", "label": "满足所有" }, { "key": "one", "label": "满足其中一个" }];
const Option = Select.Option;
const throughput = [{ "key": "all", "label": "吞吐量(总)" }, { "key": "in", "label": "吞吐量(入)" }, { "key": "out", "label": "吞吐量(出)" }];
const judge = [{ "key": "over", "label": "大于" }, { "key": "low", "label": "小于" }];
const unit = ["B", "KB", "MB", "GB"];//流量单位
const time = ['min', 's', 'h'];//时间单位
var value = {}; //存储rule的值
class Rule extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        const { getInstance } = this.props;
        if (typeof getInstance === 'function') {
            getInstance(this); // 在这里把this暴露给`parentComponent`
        }
        this.state = {
            combinig_rule: rules[0],//组合规则栏
            ruleArr: {},//rule对象,
            rule_num: 0,//规则个数
            deleteKey:''
        }
    }
    //组合规则回调事件
    handleTypeChange = (item) => {
        this.setState({
            combinig_rule: item,
        });
    }
    //流量单位选择事件,item为当前选择的值,index为当前这个对象,作用为将正在修改的整个元素重新赋值替换以前的key所对应的对象
    unitTypeChange = (item, index) => {
        let key = index.key;//当前对象的key值
        index = parseInt(index.key, 10);
        let ruleArr = this.state.ruleArr;
        let is_change = true; //代表存在修改       
        value[key][3] = item;//3代表当前对象在rule元素的位置
        let formDetail = this.rule_form(index, is_change, value[key]);
        ruleArr[key] = formDetail;
        this.setState({
            ruleArr: ruleArr
        });
    }
    timeTypeChange = (item, index) => {
        let key = index.key;
        index = parseInt(index.key, 10);
        let ruleArr = this.state.ruleArr;
        let is_change = true;
        value[key][5]=item;
        let formDetail = this.rule_form(index, is_change, value[key]);
        ruleArr[key] = formDetail;
        this.setState({
            ruleArr: ruleArr
        });
    }
    throughTypeChange = (item, index) => {
        let key = index.key;
        index = parseInt(index.key, 10);
        let ruleArr = this.state.ruleArr;
        let is_change = true;        
        value[key][0]=item;
        let formDetail = this.rule_form(index, is_change, value[key]);
        ruleArr[key] = formDetail;
        this.setState({
            ruleArr: ruleArr
        });
    }
    judgeTypeChange = (item, index) => {
        let key = index.key;
        index = parseInt(index.key, 10);
        let ruleArr = this.state.ruleArr;
        let is_change = true;        
        value[key][1]=item;
        let formDetail = this.rule_form(index, is_change, value[key]);
        ruleArr[key] = formDetail;
        this.setState({
            ruleArr: ruleArr
        });
    }
    //添加规则
    addRule = () => {
        let {  ruleArr, rule_num } = this.state;
        rule_num = rule_num + 1;//每次添加自增1
        let is_change = false;//初始化状态没false,有修改状态为true
        let index = rule_num  -1;//数组的下标从零开始,减一为保持一致
            let defaultvalue = [throughput[0], judge[0], '', unit[0], '', time[0]];//初始化正在添加的单个rule内容
            let formDetail = this.rule_form(index, is_change, defaultvalue);//返回一个rule元素
            let rule_arr = Object.keys(ruleArr).length > 0 ? Object.values(ruleArr) : [];//判断rule是否为空对象,不是则转成数组
            rule_arr.push(formDetail);//rule数组末尾增加一个rule规则
        for (let l = 0; l < rule_num; l++) {
            if ((l+1) <= Object.keys(ruleArr).length ){//是否有删除某个rule
                //按照key的顺序依次将数组转为对象
                let obj = Object.keys(ruleArr).length > 0 ? Object.keys(ruleArr) : l;
                let t =obj instanceof Array ? obj[l] : l.toString();
                ruleArr[t] = rule_arr[l]
            }else{
                if (Object.keys(ruleArr).length > 0){
                    //代表已经有删除过,,新添加的一个rule按照以有rule对象的key的数值最大值加1,确保不会覆盖以前key所对应的rule元素
                  let last =  Math.max.apply(Math, Object.keys(ruleArr));
                    ruleArr[((last + 1).toString())] = this.rule_form((last+1), is_change, defaultvalue);
                    value[((last + 1).toString())] = [throughput[0], judge[0], '', unit[0], '', time[0]];
                }else{
                    //代表第一次增加
                    ruleArr[(l.toString())] = rule_arr[l];
                    value[(l.toString())] = [throughput[0], judge[0], '', unit[0], '', time[0]];
                }
            };
        };

        this.setState({
            ruleArr: ruleArr,
            rule_num: rule_num
        });
    }

    onTimeChange = (e) => {
        let item = e.target.value;
        let index = e.target.className.replace(/[^0-9]/ig, "");//从当前对象classname值取出对应的key
        index = parseInt(index, 10);
        let ruleArr = this.state.ruleArr;
        let is_change = true;
        let key = index.toString();
        value[key][4] = item;
        let formDetail = this.rule_form(index, is_change, value[key]);
        ruleArr[key] = formDetail;
        this.setState({
            ruleArr: ruleArr,
        });
    }
    onUnitChange = (e) => {
        let item = e.target.value;
        let index = e.target.className.replace(/[^0-9]/ig, "");
        index = parseInt(index, 10);
        let ruleArr = this.state.ruleArr;
        let is_change = true;
        let key = index.toString();
        value[key][2] = item;
        let formDetail = this.rule_form(index, is_change, value[key]);
        ruleArr[key] = formDetail;
        this.setState({
            ruleArr: ruleArr
        })
    }
    confirm = () => {
        if (typeof this.state.deleteKey === 'number'){
            let index = this.state.deleteKey;
            let key = index.toString();
            let { ruleArr, rule_num } = this.state;
            delete ruleArr[key];//删除rule对象这个key所对应的rule元素
            delete value[key];//删除value对象这个key所对应的value值
            this.setState({
                delenum: index,
                ruleArr: ruleArr,
                rule_num: rule_num - 1//删除一个rule元素自减一
            });
            message.success('删除成功');
        }
    }
    cancel = () => {
        message.error('取消删除');
    }
    onClick = (e)=>{
        let index = e.target.className.replace(/[^0-9]/ig, "");
        this.setState({
            deleteKey: parseInt(index,10)
        })
    }
    onSubmit = () => {
        return value;
    }

    rule_form = (index, is_change,value)=>{
        index = index.toString();
            //没有修改就显示默认的初始值,有修改则按照value数组的下标按照对应的位置赋值,classname绑定key
            return (
                <Row key={index} >
                    <Col>
                        <Form layout="inline">
                            <Form.Item
                            >
                                <Select
                                    onChange={this.throughTypeChange.bind(this)}
                                    labelInValue={true}
                                    value={is_change ? value[0] : throughput[0]}
                                     
                                >
                                    {throughput.map((item) => <Option key={index} value={item.key} >{item.label}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                            >
                                <Select
                                    onChange={this.judgeTypeChange.bind(this)}
                                    labelInValue={true}
                                    value={is_change ? value[1] : judge[0]}
                                >
                                    {judge.map((item) => <Option key={index} value={item.key} >{item.label}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                            >
                                <Input onChange={this.onUnitChange.bind(this)} className={`flowNumber${index}`} value={is_change ? value[2] : ''} />
                            </Form.Item>
                            <Form.Item
                                style={{ "marginLeft": "-18px" }}
                            >
                                <Select
                                    onChange={this.unitTypeChange.bind(this)}
                                    value={is_change ? value[3] : unit[0]}
                                    style={{"width":"65px"}}
                                >
                                    {unit.map((item) => <Option key={index} value={item} >{item}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                            >
                                <Input onChange={this.onTimeChange.bind(this)} value={is_change ? value[4] : ""} className={`time${index}`} />
                            </Form.Item>
                            <Form.Item
                                style={{ "marginLeft": "-18px" }}
                            >
                                <Select
                                    onChange={this.timeTypeChange.bind(this)}
                                    value={is_change ? value[5] : time[0]}
                                    style={{"width":"67px"}}
                                >
                                    {time.map((item) => <Option key={index} value={item} >{item}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                            > 
                                <Popconfirm title="确定删除?" onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="确定" cancelText="取消">
                                    <Button style={{ "width": "10px", "marginLeft": "-15px", "border": "0px" }} className={`deleteone${index}`}
                                        key={index} onClick={this.onClick.bind(this)}><Icon type="delete" className='deleteone' /></Button>
                                </Popconfirm>
                                
                            </Form.Item>
                        </Form>
                    </Col >
                </Row >
            )
        }

    render() {
        var { combinig_rule ,ruleArr} = this.state;        
        return (
            <div  >
                <Row >
                    <Col  >
                        组合规则:  <Select
                            onChange={this.handleTypeChange.bind(this)}
                            labelInValue={true}
                            value={combinig_rule ? combinig_rule : rules[0]}
                            style={{ "width": "15%" }}
                        >
                            {rules.map((item) => <Option key={item.key} value={item.key} >{item.label}</Option>)}
                        </Select>
                        &nbsp;&nbsp;
                        <Button onClick={this.addRule.bind(this)} type="primary">添加规则</Button>&nbsp;&nbsp;
                    </Col>
                </Row>
                <div  className="ruleo" style={{"marginTop":"12px"}}>
                    <Scrollbars
                        autoHide
                        autoHideTimeout={100}
                        autoHideDuration={200}
                        universal={true}
                        autoHeightMax={240}
                        className='containerIn'
                        style={{ height: "260px" }}
                    >
                        {Object.values(ruleArr)}
                    </Scrollbars>
                </div>
               
            </div>
        )
    }
}
export default Form.create()(Rule)