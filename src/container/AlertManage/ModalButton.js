/**
 * 弹窗按钮
 */
import React from 'react';
// import {
//     Link,
// // } from 'react-router-dom';
// import _ from 'lodash';
import {
    Button,
    Form,
    // Input,
    // Row,
    // Col,
    // Select,
    // message,
    // Radio,
    Modal,
    // message,
} from 'antd';
import TableList from './TableList';
import $ from 'jquery'
// import TableListUser from './TableListUser';
// import { height } from 'window-size';
 class ModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           visible:false,
        //    selectValues: [],
        //    url:this.props.url,
           types:this.props.type ? this.props.type : "",
           positionStyle:"absolute",      //给input上的按钮赋样式absolute, 
           valueHasSelec: JSON.parse(localStorage.getItem('hasselectArr')),
        }
    }
    componentDidMount=()=>{

        // 先去掉input上的按钮赋样式absolute 再延迟赋值回来， 避免input上的按钮高度不全而点不到弹框, 
        this.setState({
            positionStyle:"",
        });
        setTimeout(()=>{
            this.setState({
                positionStyle:"absolute",
            });
        },100);
        
        $('.ant-select-selection__rendered > ul').css('z-index', 999);
        $('.ant-select-selection__rendered > ul').css('position','absolute' );
        // $('.ant-select-selection__rendered > ul > li:last').remove()
        // if (this.state.valueHasSelec.length === 0) {
        //     $('.ant-select-selection__rendered > ul > li').css('display','none')
        //     // $('li.ant-select-search ant-select-search--inline').remove()
        // }
        
    }

    // componentDidUpdate = () => {
    //     var aa = $('.ant-select-selection__rendered > ul > li');
    //     console.log(aa.length)
    // }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,

        });
    }
    selectValue = (newValue,showVisible) => {
        this.props.selectedVD({ newValues: newValue.newValue });
        this.setState({
            visible: showVisible,
            valueHasSelec: newValue.newValue
        });
    }
    
    render() {
        var btnStyle={
            opacity: "0.01",
            // backgroundColor:"green", 
            width: "100%", 
            height: "100%",
            position:this.state.positionStyle, 
            top: "0px", 
            left: "0px",
            zIndex: 10,
        };
        return (
            <div style={btnStyle}> 
                <Button type="primary" id="123" onClick={this.showModal} style={btnStyle} ></Button>
                <Modal
                    // destroyOnClose={true}
                    title="选择主机"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    // dataSource={this.state.permData}
                    footer={null}
                >
                   <TableList url='' selectedV={this.selectValue}    /> 
                </Modal>

            </div>
        );
    }
}

export default Form.create()(ModalButton);

