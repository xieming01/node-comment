import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, Checkbox,message
} from 'antd';
import './login.less'
import png from '../../img/rd.jpg'
import { myAxiosPost } from '../axios/index'

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                myAxiosPost('/login',{'info': values},(status,result)=>{
                    if (status) {
                        localStorage.setItem('user',JSON.stringify({'username':result.username,'img_url':result.avatar}))
                        message.success('登陆成功！！！')
                        this.props.history.push({ pathname:'/home' })
                        
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
                    <br/>
                     
                    <div className="login-form">
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Item className='login-name'>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your email!' },{ validator: this.validateToNextEmail.bind(this)}],
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
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>自动登录</Checkbox>
                                )}
                                 <a className="login-form-forgot" href="">忘记密码</a> 
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                                   <div>
                                    其他登录方式 <a> <Icon type="github" className='icon-login'  /> </a>
                                    <a className="login-form-forgot" href="/register"> 注册账户</a>
                                   </div>
                            </Form.Item>
                        </Form>
                    </div>
                 </div>
            </div>
        );
    }
}

export default Form.create()(Login)