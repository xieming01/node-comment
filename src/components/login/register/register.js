import React, { Component } from 'react'
import {
    Form, Icon, Input, Button,  
} from 'antd';
import './register.less'
import png from '../../../img/rd.jpg'
import { myAxiosPost } from '../../axios/index'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                myAxiosPost('/register',{'info': values},(status,result)=>{
                    if (status) {
                        this.props.history.push('/login')
                    }
                })
                
            }
        });
    }

    validateToNextEmail = (rule, value, callback) => {
        // const form = this.props.form;

        /**以大写字母[A-Z]、小写字母[a-z]、数字[0-9]、下滑线[_]、减号[-]及点号[.]开头，并需要重复一次至多次[+]。
        中间必须包括@符号。
        @之后需要连接大写字母[A-Z]、小写字母[a-z]、数字[0-9]、下滑线[_]、减号[-]及点号[.]，并需要重复一次至多次[+]。
        结尾必须是点号[.]连接2至4位的大小写字母[A-Za-z]{2,4}。 */
        var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        if (pattern.test(value)) {
            callback();
        } else {
            callback('邮箱格式不对！！！！')
        }
        
      }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-container' >
                <div className='login-body'>
                    <div className='login-title'><img src={png} alt='' /> DisplayHDR</div>
                    {/* <p>Ant Design 是西湖区最具影响力的 Web 设计规范</p> */}
                    <br />

                    <div className="login-form">
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Item className='login-name'>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </Form.Item>
                            <Form.Item className='login-name'>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true},{ validator: this.validateToNextEmail.bind(this)}],
                                   
                                })(
                                    <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
                                )}
                            </Form.Item>
                            <Form.Item className='login-passwd'>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </Form.Item>
                            <Form.Item className='login-remeber'>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    注册
                                </Button>
                                <div>
                                    已有账号? 
                                    <a   href="/login"   > 点击登录</a>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(Register)