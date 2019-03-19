/**
 *  多级菜单筛选
 */

import React from 'react';
import {   Checkbox, Row, Col , Icon } from 'antd';
import {
    // Link,
} from 'react-router-dom';
var levelHeight = 35

export default class MultiLeveItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            childrenTree: false,
        };
    }

    onMouseLeaveAction = () => {
        this.setState({
            hightlightColor: "#ffff",
            childrenTree: false,
        });
    }

    onMouseEnterAction = (even) => {
        this.setState({
            hightlightColor: "#90ccf7",
            childrenTree: true,
        });
        if(this.props.showChildrenAction){
            this.props.showChildrenAction(this.props.itemData)
        }
        if(this.props.showSecondChildrenAction){
            this.props.showSecondChildrenAction(this.props.itemData);
        }
    }

    //点击  item:点中的元素
    onClickRowAction = (item) => {
        if (this.props.itemData.checked) {
            this.setState({
                checked: false,
            });
        } else {
            this.setState({
                checked: true,
            });
        }
        if(this.props.didSelectRow){
            this.props.didSelectRow(this.props.itemData,!this.props.itemData.select);
        }
        
    }
    render() {
        return (
            <div>
                <div onMouseEnter={this.onMouseEnterAction.bind(this)}
                    onMouseLeave={this.onMouseLeaveAction.bind(this)}
                    style={{ backgroundColor: this.state.hightlightColor, textAlign: "center" }}
                    onClick={this.onClickRowAction.bind(this)}>
                    <Row style={{ height:levelHeight, padding: "8px 0px 0px " }}>
                        <Col span={6} offset={1}>
                            <Checkbox checked={this.props.itemData.select} ></Checkbox>
                        </Col>
                        <Col span={13}>
                            <p style={{ backgroundColor: this.props.backColor, textAlign: "left" }}>{this.props.itemData.value}</p>
                        </Col>
                        {
                            this.props.itemData.children.length>0 ? 
                                <Col span={4}>
                                    <Icon type="right" />
                                </Col>:""
                        }

                    </Row>
                    {/* 线条 */}
                    <div style={{ backgroundColor: "#eeeeee", height: "1px", width: "100%" }}></div>
                </div>
            </div>
        );
    }
}