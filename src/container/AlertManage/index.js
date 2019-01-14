import React, { Component } from 'react';
import { Drawer, Button, message, Row, Col  } from 'antd';
import TabDetail from './TabDetail';
// import PropTypes from "prop-types";
import './timeselect.css'
class AlertManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: "手动阀值"
        }
    }
    // // 父组件声明自己支持 context
    // static childContextTypes = {
    //     onSubmit: PropTypes.func,
    // }
    // // 父组件提供一个函数，用来返回相应的 context 对象
    // getChildContext() {
    //     return {

    //         onSubmit: this.onSubmit.bind(this)
    //     }
    // }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    deleteOnCancel = (e) => {
        message.error('取消删除', 3);
    }
   
 
    render() {
   
        return (
            <div >
                <Row className="tools">
                    
                    <Col    >
                        <Button type="primary" onClick={this.showDrawer.bind(this)} className='button-drawer'>
                            添加告警
                        </Button>
                    </Col>
                </Row>
               
                <Drawer
                    title="添加规则"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    destroyOnClose={true}
                    width="1000px"
                >
                    <TabDetail onClose={this.onClose.bind(this)} />
                </Drawer>

            </div>
        )
    }
}

export default AlertManage