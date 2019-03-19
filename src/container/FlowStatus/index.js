/*  
step 的四种状态

*/
import React from 'react';
import {
    // Steps,
    // Button,
    // Radio,
} from 'antd';
// import { Button } from 'antd/lib/radio';
// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
// const Step = Steps.Step;
const Radius = 15;
const MARGIN = 10;
const LINEWIDTH = 120;
var pointArr = [];

class CircleTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],//原始数据
            allPointArray: [],//所有圆心坐标点
        }
    }

    /**
     * 递归找到所有结点的坐标
     */
    nodeLocation = (array, parentObj) => {
        for (let index = 0; index < array.length; index++) {
            var childrenObj = array[index];
            //找到子结点id 赋值坐标
            if (parentObj.childrenID === childrenObj.id) {
                childrenObj.point.x = parentObj.point.x + LINEWIDTH + Radius;
                childrenObj.point.y = parentObj.point.y;
                pointArr.push(childrenObj);
                break;
            }
        }
        //如果还有子结点
        if (childrenObj.childrenID) {
            this.nodeLocation(array, childrenObj);
        }

    }

    componentDidMount = () => {
        var testData = '[{"id":1,"startFlag":1,"endFlag":0,"state":1,"name":"node1","parentID":"","childrenID":2,\
            "branchs":[{"id":7,"name":"node7","state":1,"parentID":"1","childrenID":"3","branchs":[],\
            "branchFlag":0,"point":{"x":0,"y":0}},{"id":9,"name":"node9","state":1,"parentID":"1","childrenID":"3","branchs":[],\
            "branchFlag":0,"point":{"x":0,"y":0}}],"branchFlag":1,"point":{"x":0,"y":0}},' +
            '{"id":2,"startFlag":0,"endFlag":0,"state":2,"name":"node2","parentID":"1","childrenID":3,"branchs":[],"branchFlag":0,"point":{"x":0,"y":0}},' +
            '{"id":3,"startFlag":0,"endFlag":0,"state":1,"name":"node3","parentID":"2","childrenID":4,"branchs":[{"id":10,"name":"node10","parentID":"3",\
            "state":1,"childrenID":"5","branchs":[],"branchFlag":0,"point":{"x":0,"y":0}}],"branchFlag":1,"point":{"x":0,"y":0}},' +
            '{"id":4,"startFlag":0,"endFlag":0,"state":3,"name":"node4","parentID":"3","childrenID":5,"branchs":[],"branchFlag":0,"point":{"x":0,"y":0}},' +
            '{"id":5,"startFlag":0,"endFlag":0,"state":1,"name":"node5","parentID":"4","childrenID":6,"branchs":[],"branchFlag":0,"point":{"x":0,"y":0}},' +
            '{"id":6,"startFlag":0,"endFlag":0,"state":1,"name":"node6","parentID":"5","childrenID":"","branchs":[],"branchFlag":0,"point":{"x":0,"y":0}},'+
            '{"id":7,"startFlag":0,"endFlag":1,"state":1,"name":"node11","parentID":"6","childrenID":"","branchs":[],"branchFlag":0,"point":{"x":0,"y":0}}]';
        var testArray = JSON.parse(testData);
        // testArray.psuh({ "id": 11, "startFlag": 0, "endFlag": 1, "state": 1, "name": "node11", "parentID": "6", "childrenID": "", "branchs": [], "branchFlag": 0, "point": { "x": 0, "y": 0 }})
        for (let index = 0; index < testArray.length; index++) {
            var nodeObj = testArray[index];//开始节点
            if (nodeObj.startFlag === 1) {
                //找到开始标志 计算开始坐标
                var orginx = MARGIN;
                var orginy = MARGIN;
                orginx = MARGIN + Radius + index * (Radius + LINEWIDTH);
                orginy = MARGIN + Radius;
                nodeObj.point.x = orginx;
                nodeObj.point.y = orginy;

                pointArr.push(nodeObj);

                //找到下一主结点， 计算坐标
                this.nodeLocation(testArray, nodeObj);
                break;
            }
        }

        //找分支坐标
     for (let index = 0; index < testArray.length; index++) {
            nodeObj = testArray[index];
            if (nodeObj.branchFlag === 1) {
                //说明有分支
                for (let m = 0; m < nodeObj.branchs.length; m++) {
                    var branchObj = nodeObj.branchs[m];
                    branchObj.point.x = nodeObj.point.x + LINEWIDTH + Radius;
                    branchObj.point.y = nodeObj.point.y + (m + 1) * LINEWIDTH / 2;
                    pointArr.push(branchObj);
                }
            }
        }
        this.startDrawCircleAndLineAction(testArray, 0);
        
        this.setState({
            data: testArray,
            allPointArray: pointArr,
        });
    }

    /**
     * 开始画图
     * testArray: 数据源
     * paramID: 点击结点ID 改变画布上按钮的样式 
     */
    startDrawCircleAndLineAction = (testArray, paramID) => {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, 800, 800);
        //画图
        for (let index = 0; index < testArray.length; index++) {
            const element = testArray[index];
            if (index === (testArray.length - 1)) {
                    element.point = {}
            }
            this.drawCircleInCanvas(context, element.point.x, element.point.y, element.state, paramID === element.id ? 1 : 0);
            //画分支圆
            if (element.branchFlag === 1) {
                for (var kk = 0; kk < element.branchs.length; kk++) {
                    var branchObj = element.branchs[kk];
                    this.drawCircleInCanvas(context, branchObj.point.x, branchObj.point.y, branchObj.state, paramID === branchObj.id ? 1 : 0);
                }
            }
        }

        //画线
        var startObj;
        for (let index = 0; index < testArray.length; index++) {
            var nodeObj = testArray[index];
            //找到开始结点
            if (nodeObj.startFlag === 1) {
                startObj = nodeObj;
                break;
            }
        }
        this.drawLineTest(context, startObj, testArray);
    }

    /**
     * 画线条 连接
     * context: 画布上下文
     * fromX: 起始坐标X
     * fromY: 起始坐标Y
     * toX: 终点坐标X
     * toY:终点坐标Y
     */
    drawLineInCanvas = (context, fromX, fromY, toX, toY) => {
        context.beginPath();
        fromX = fromX + Radius;
        context.moveTo(fromX, fromY);
        context.strokeStyle = "#8ebe5c";

        if (toX === fromX || toY === fromY) {
            //如果有一个相等说明在同一坐标线上， 直接画线
            context.strokeStyle = "#587d31";
            context.lineTo(toX - Radius, toY);
            context.stroke();
        } else {
            //说明有折点
            if (toX > fromX) {
                //找出x轴上的折点
                if (toY > fromY) {
                    //在y为正
                    context.lineTo(fromX, toY);
                } else {
                    context.lineTo(toX - Radius, fromY);
                }
            }
            context.lineTo(toX - Radius, toY);
            context.stroke();
        }
    }

    drawLineTest = (context, startObj, array) => {
        var tempObj;
        for (let k = 0; k < array.length; k++) {
            tempObj = array[k];
            if (startObj.childrenID === tempObj.id) {
                //找到下一结点
                this.drawLineInCanvas(context, startObj.point.x, startObj.point.y, tempObj.point.x, tempObj.point.y);
                break;
            }
        }
        if (tempObj.childrenID) {
            //如果还有子结点 继续
            this.drawLineTest(context, tempObj, array);
        }
        this.drawBranchLine(context, array);
    }

    drawBranchLine = (context, array) => {
        var tempObj;
        for (let m = 0; m < array.length; m++) {
            tempObj = array[m];
            if (tempObj.branchFlag === 1) {
                //说明有分支结点
                var branchObjArr = tempObj.branchs;
                for (let k = 0; k < branchObjArr.length; k++) {
                    var branchObj = branchObjArr[k];
                    //前半部分连线
                    this.drawLineInCanvas(context, tempObj.point.x + LINEWIDTH / 2, tempObj.point.y, branchObj.point.x, branchObj.point.y);
                    for (let p = 0; p < array.length; p++) {
                        var tt = array[p];
                        if (parseInt(branchObj.childrenID,10) === tt.id) {
                            //后半部分连线
                            this.drawLineInCanvas(context, branchObj.point.x, branchObj.point.y, tt.point.x - LINEWIDTH / 2, tt.point.y);
                            break;
                        }
                    }
                }
            }
        }
    }
    /**
     * context: 画布上下文
     * orginx : 圆心x
     * orginy : 圆心y
     * state  : 状态
     * clickState: 点击状态 1：表示点击按下  other：否
     * 
     */
    drawCircleInCanvas = (context, orginx, orginy, state, clickState) => {
        switch (state) {
            case 1:
                //绿色
                context.fillStyle = clickState ? "green" : "#8ebe5c";
                break;
            case 2:
                //红色
                context.fillStyle = clickState ? "#9c2525" : "#ec2b2bb8";
                break;
            case 3:
                //蓝色
                context.fillStyle = clickState ? "blue" : "#3b58eac2";
                break;
            default:
                break;
        }

        context.beginPath();
        //圆形区域  
        context.arc(orginx, orginy, Radius, 0, Math.PI * 2, false);    //注意这里的参数是弧度制，而不是角度制  
        context.closePath();
        context.fill();  //填充颜色

        if (state === 1) {
            //画勾
            context.beginPath();
            context.strokeStyle = "#fff";
            context.lineWidth = 1;
            context.moveTo(orginx - Radius / 2, orginy);
            context.lineTo(orginx - Radius / 5, orginy + Radius / 3);
            context.lineTo(orginx + Radius / 2, orginy - Radius / 3);
            context.stroke();
        } else if (state === 2) {
            //画x
            context.beginPath();
            context.strokeStyle = "#fff";
            context.lineWidth = 1;
            context.moveTo(orginx - Radius / 3, orginy - Radius / 3);
            context.lineTo(orginx + Radius / 3, orginy + Radius / 3);
            context.stroke();

            context.beginPath();
            context.strokeStyle = "#fff";
            context.lineWidth = 1;
            context.moveTo(orginx - Radius / 3, orginy + Radius / 3);
            context.lineTo(orginx + Radius / 3, orginy - Radius / 3);
            context.stroke();
        } else if (state === 3) {
            //等待中
            var startAngle = 0;
            var endAngle = Math.PI * 2 * 5 / 6;
            var aa = false;
            setInterval(() => {
                context.clearRect(orginx - Radius, orginy - Radius, 2 * Radius, 2 * Radius);
                context.beginPath();
                //圆形区域  
                context.arc(orginx, orginy, Radius, 0, Math.PI * 2, false);    //注意这里的参数是弧度制，而不是角度制  
                context.closePath();
                context.fill();  //填充颜色

                context.beginPath();
                context.strokeStyle = "#fff";
                context.lineWidth = 1;
                context.arc(orginx, orginy, Radius / 2, startAngle, endAngle, false);
                context.stroke();
                startAngle = aa ? Math.PI : 0;
                endAngle = aa ? Math.PI / 6 : Math.PI * 5 / 3
                aa = !aa;
            }, 100);
        }
    }

    /**
     * 点击事件
     * event：canvas内包含坐标
    //  */
    // approveMouseDonwn = (event) => {
    //     //取到鼠标点击canvas的位置
    //     var x = event.pageX - this.canvas.getBoundingClientRect().left;
    //     var y = event.pageY - this.canvas.getBoundingClientRect().top;
    //     for (let index = 0; index < this.state.allPointArray.length; index++) {
    //         const nodeObj = this.state.allPointArray[index];
    //         if (Math.abs(x - nodeObj.point.x) < Radius && Math.abs(y - nodeObj.point.y) < Radius) {
    //             //说明点中了结点 结点变色 取出结点id 
    //             this.startDrawCircleAndLineAction(this.state.data, nodeObj.id)
    //         }
    //     }
    // }
    // approveMouseUp = (event) => {
    //     //重新绘制canvas
    //     //取到鼠标点击canvas的位置
    //     var x = event.pageX - this.canvas.getBoundingClientRect().left;//this.canvas.getBoundingClientRect().left表示当前画布距离屏幕左边的距离,event.pageX代表当前页面的x轴坐标
    //     var y = event.pageY - this.canvas.getBoundingClientRect().top;
    //     for (let index = 0; index < this.state.allPointArray.length; index++) {
    //         const nodeObj = this.state.allPointArray[index];
    //         if (Math.abs(x - nodeObj.point.x) < Radius && Math.abs(y - nodeObj.point.y) < Radius) {
    //             //说明点中了结点 结点变色 取出结点id 
    //             this.startDrawCircleAndLineAction(this.state.data, 0)
    //         }
    //     }
    // }

    // clickMe = (event) => {
    //     const context = this.canvas.getContext('2d');
    //     context.clearRect(415, 10, 2 * Radius, 2 * Radius);
    // }

    render() {
        return (
            <div>
                <canvas 
                // onMouseDown={this.approveMouseDonwn.bind(this)} 
                    style={{ "margainTop": "100px" }}
                    // onMouseUp={this.approveMouseUp.bind(this)}
                    // onMouseLeave={this.approveMouseUp.bind(this)}
                    width="800"
                    height="400"
                    ref={(c) => {
                        this.canvas = c;
                    }} >
                </canvas>
                {/* <Button type="primary" onClick={this.clickMe.bind(this)}>Button</Button> */}


            </div>
        );
    }
}


class FlowStatus extends React.Component {
 

    render() {
        return (
            <div >
                {/* <canvas  width="500px" height="300px"
                    ref={(c) => {
                        this.canvas = c;
                    }} >
                </canvas> */}
                <CircleTest  />
            </div>
        );
    }
}

export default FlowStatus;