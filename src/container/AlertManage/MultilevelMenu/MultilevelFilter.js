/**
 *  多级菜单筛选
+ *  数据源格式 ： id  name  children
+ *  [{"id":1, "name":"xiaohuang", "children":[{"id":100,"name":"hhww","children":[]}]
 */

import React from 'react';
import { Button,   Row, Col  } from 'antd';
import {

} from 'react-router-dom';
import MultiLeveItem from "./MultiLeveItem";
var data = [{"id":0, "value":"xiahuangz", "children":[]},
{"id":1, "value":"xihuang1", "children":[{"id":100,"value":"hhwwvv","children":[]},{"id":101,"value":"hhww",
"children":[{"id":120,"value":"kkh0000s","children":[]},{"id":121,"value":"hh0wwzs","children":[]}]}]},{"id":2, "value":"qqwwqwa","children":[]}];
// var levelHeight = 35;
export default class MultilevelFilter extends React.Component {
    constructor(props) {
        super(props);

        var tempData = data;
        // tempData = this.changekeyValue(tempData);

        this.setFalseFlagToData(tempData); //设置为select为false
        this.state = {
            data: tempData,
            childPositionY1: 0,  //二级位置
            childPositionY2: 0, //三级位置
            childItems: [],  //二级菜单
            thirdItems: [], //三级菜单
            level: 1, //默认只有一级

            levelWidth: 140,  //默认
            level2Width: 120,
            level3Width: 120,

            firstObj: {},
            secondObj: {},
            thirdObj: {},
            submitArr: [],

        };
    }
    //为每个元素添加默认未选中select = false
    setFalseFlagToData = (data) => {
        for (let index = 0; index < data.length; index++) {
            const firstObj = data[index];
            firstObj.select = false;   //第一级false
            if (firstObj.children) {
                for (let mm = 0; mm < firstObj.children.length; mm++) {
                    const childObj = firstObj.children[mm];
                    childObj.select = false  //第二级false
                    if (childObj.children) {
                        for (let kk = 0; kk < childObj.children.length; kk++) {
                            const thirdObj = childObj.children[kk];
                            thirdObj.select = false //第三级false
                        }
                    }
                }
            }
        }
    }

    //点击确定
    handleMenuSumbitClick = () => {
        //取value为true的
        var tempArr = [];
        // this.setState({submitArr:tempArr});//选置空
        this.getSelectElement(tempArr);
        if (this.handleMenuSumbitClick) {
            this.props.handleMenuSumbitClick(tempArr);
        }
    }

    //重置
    handleMenuResetClick = () => {
        if (this.handleMenuResetClick) {
            this.props.handleMenuResetClick();
        }
        this.setFalseFlagToData(this.state.data);
    }

    //判断有没有子级菜单 显示子级菜单
    //取value为true的
    getSelectElement = (tempArr) => {
        for (let index = 0; index < this.state.data.length; index++) {
            var firstObj = this.state.data[index];
            this.getChildrenSelect(firstObj, tempArr);
            if (firstObj.select) {
                tempArr.push(firstObj);
            }
        }
    }
    getChildrenSelect = (data, arr) => {
        if (data.children) {
            for (let index = 0; index < data.children.length; index++) {
                const tempObj = data.children[index];
                if (tempObj.select) {
                    arr.push(tempObj);
                }
                if (tempObj.children) {
                    this.getChildrenSelect(tempObj, arr)
                }
            }
        }
    }

    //判断有没有子级菜单 显示子二级菜单
    showChildrenAction = (itemData) => {
        //清空下一级节点
        if (this.state.firstObj.value !== itemData.value) {
            this.setState({ firstObj: {}, secondObj: {} });
        }
        for (var index = 0; index < this.state.data.length; index++) {
            var obj = this.state.data[index];
            if (obj.value === itemData.value) {
                this.setState({
                    firstObj: obj,
                });
                break;
            }
        }
    }

    //判断有没有子级菜单 显示子级菜单
    //判断有没有子级菜单 显示三子级菜单ssss
    showSecondChildrenAction = (itemData) => {
        if (this.state.secondObj.value !== itemData.value) {
            this.setState({ secondObj: {} });
        }
        for (var index = 0; index < this.state.data.length; index++) {
            var firstObj = this.state.data[index];
            if (firstObj.children) {
                for (let xx = 0; xx < firstObj.children.length; xx++) {
                    const secondObj = firstObj.children[xx];
                    if (secondObj.value === itemData.value) {
                        this.setState({
                            level: 3,
                            secondObj: secondObj,
                        });
                    } else {
                        // this.setState({secondObj:{}});
                    }
                }

            }
        }
    }
    calculateAtIndex = (data) => {
        var tempAtIndex = 0;
        for (var index = 0; index < this.state.data.length; index++) {
            var firstObj = this.state.data[index];
            if (data.value === firstObj.value) {
                //说明在第一节点
                tempAtIndex = this.state.data.length - index + 1;
                break;
            }
            if (firstObj.children) {
                for (let xx = 0; xx < firstObj.children.length; xx++) {
                    const secondObj = firstObj.children[xx];
                    if (secondObj.value === data.value) {
                        //说明第二节点
                        tempAtIndex = this.state.data.length - (index + xx) + 1;
                        break;
                    }
                }
            }

        }

        return -tempAtIndex * 36;
    }
    //点击时调用
    didSelectRow = (item, flag) => {
        var tempData = this.state.data;
        item.select = flag; //数据源也会同时改为false
        //如果有子级， 全部改为flag
        if (item.children) {
            for (let index = 0; index < item.children.length; index++) {
                const childObj = item.children[index];
                childObj.select = flag
                if (childObj.children) {
                    for (let index = 0; index < childObj.children.length; index++) {
                        const thirdObj = childObj.children[index];
                        thirdObj.select = flag
                    }
                }
            }
        }
        var atIndex = 0;
        var levelIndex = 1;
        var tempSelectObj;
        for (let index = 0; index < tempData.length; index++) {
            const itemObj = tempData[index];
            //去循环每一级 看是不是全选状态 如果不是 则父级不选中
            if (itemObj.children) {
                for (let mm = 0; mm < itemObj.children.length; mm++) {
                    const childObj = itemObj.children[mm];
                    //先去循环第三级 
                    if (childObj.children) {
                        for (let kk = 0; kk < childObj.children.length; kk++) {
                            const thirdObj = childObj.children[kk];
                            if (item.value === thirdObj.value) {
                                levelIndex = 3; //说明选中的是第三级 
                                atIndex = index + mm;
                                //如果相同则说明选中的是第三级 看此级是否全选 是的话父节点选中
                                childObj.select = this.getselectFlag(childObj);
                                itemObj.select = this.getselectFlag(itemObj);  //反推一级节点是否选中
                                tempSelectObj = childObj;

                            }
                        }
                    }

                }
            }

        }
        for (let index = 0; index < tempData.length; index++) {
            const firstObj = tempData[index];
            if (firstObj.children) {
                for (let mm = 0; mm < firstObj.children.length; mm++) {
                    const secondObj = firstObj.children[mm];
                    if (secondObj.value === item.value) {
                        levelIndex = 2;
                        atIndex = index
                        //如果有相等说明点击的是第二级  看此同级是否全选 是的话父节点选中
                        firstObj.select = this.getselectFlag(firstObj);
                    }
                }
            }

        }
        if (levelIndex === 1) {
            this.showChildrenAction(item); //去刷新第二级

        } else if (levelIndex === 2) {
            this.showSecondChildrenAction(item);  //去刷新第三级
            this.setState({
                childPositionY2: atIndex * 36,
            })
        } else {
            //去刷新第三级
            this.setState({
                secondObj: tempSelectObj,
            });
        }
    }
    //取节点下所有的children select是否全选
    getselectFlag = (data) => {
        var tempFlag = true;
        for (let index = 0; index < data.children.length; index++) {
            const itemObj = data.children[index];
            tempFlag = tempFlag && itemObj.select;
        }
        return tempFlag
    }

    render() {
        var data = [];
        for (var index = 0; index < this.state.data.length; index++) {
            var obj = this.state.data[index];
            data.push(<div key={"firstDiv" + index}>
                {/* 第一级 */}
                <MultiLeveItem key={"firstItem" + index} showChildrenAction={this.showChildrenAction.bind(this)} didSelectRow={this.didSelectRow.bind(this)} itemData={obj}></MultiLeveItem>
            </div>)
        }

        var secondArray = [];
        var tempArr = []
        if (this.state.firstObj && this.state.firstObj.children) {
            for (let index = 0; index < this.state.firstObj.children.length; index++) {
                const secondObj = this.state.firstObj.children[index];
                tempArr.push(
                    <div key={"second_div" + index}>
                        {/* 第二s级 */}
                        <MultiLeveItem key={"secondItem" + index} showSecondChildrenAction={this.showSecondChildrenAction.bind(this)} didSelectRow={this.didSelectRow.bind(this)} itemData={secondObj}></MultiLeveItem>
                    </div>);
            }
            secondArray.push(
                <Col key={"second"} style={{ width: this.state.level2Width, marginLeft: this.state.levelWidth, marginTop: this.calculateAtIndex(this.state.firstObj), position: "absolute" }}>
                    <div style={{ width: "100%", backgroundColor: "#fff", border: "solid 0px ", boxShadow: "0px 0px 7px gray" }}>
                        {tempArr}
                    </div>
                </Col>);
        }
        var thirdArray = [];
        if (this.state.secondObj && this.state.secondObj.children && tempArr.length > 0) {
            var tempArray = []
            for (let index = 0; index < this.state.secondObj.children.length; index++) {
                const thirdObj = this.state.secondObj.children[index];
                tempArray.push(
                    <div key={"third_div" + index}>
                        {/* 第三s级 */}
                        <MultiLeveItem key={"thirdItem" + index} didSelectRow={this.didSelectRow.bind(this)} itemData={thirdObj}></MultiLeveItem>
                    </div>);
            }
            thirdArray.push(
                <Col key={"thirdCol"} style={{ width: this.state.level3Width, marginLeft: this.state.levelWidth + this.state.level2Width, marginTop: this.calculateAtIndex(this.state.secondObj), position: "absolute" }}>
                    <div style={{ width: "100%", backgroundColor: "#fff", border: "solid 0px ", boxShadow: "0px 0px 7px gray" }}>
                        {tempArray}
                    </div>
                </Col>);
        }

        return (
            // width: this.state.levelWidth + (120 * this.state.level - 1), 
            <div style={{backgroundColor: "white" }} className='conta'>
                <Row>
                    <Col style={{ width: "140px" }}>
                        <div style={{ width: "100%", backgroundColor: "#fff", border: "solid 0px ", boxShadow: "0px 0px 7px gray" }}>
                            <div className='conta-fir'>
                                {data}
                            </div>
                            {/* 底部 button */}
                            <div style={{ width: "140px" }}>
                                <Row>
                                    <Col span={12} style={{ textAlign: "center" }}>
                                        <Button type="default" style={{ border: "solid 0px ", color: "#0f8ee9" }} onClick={this.handleMenuResetClick.bind(this)}>重置</Button>
                                    </Col>
                                    <Col span={12} style={{ textAlign: "center" }}>
                                        <Button type="default" style={{ border: "solid 0px", color: "#0f8ee9" }} onClick={this.handleMenuSumbitClick.bind(this)}>确定</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    {secondArray}
                    {thirdArray}
                </Row>
            </div>
        );
    }
}