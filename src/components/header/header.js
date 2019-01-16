import React, { Component } from 'react'
import { Input, Icon, Avatar, Popover ,Row,Col,message } from 'antd'
import { Link } from 'react-router-dom'
import './head.less'
import png from '../../img/rd.jpg'
import { myAxiosGet } from '../axios/index'
import MessageSvg from '../../img/sign.png'
const Search = Input.Search
// var is_clcik = [1,0,0,0]
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_clcik: [1,0,0,0],
        }
    }

    // shouldComponentUpdate = (nextProps) => {
    //     if (this.props.location.pathname === nextProps.location.pathname) {
    //          var as = nextProps.location.pathname 
    //           if(as.indexOf('home') !== -1){
    //             is_clcik = [1,0,0,0]
    //           }else if (as.indexOf('table') !== -1) {
    //             is_clcik = [0,1,0,0]
    //           }else if(as.indexOf('container') !== -1) {
    //             is_clcik = [0,0,1,0]
    //           }else {
    //             is_clcik = [0,0,0,1]
    //           }

    //           return true
    //     }
    //     return false
    // }
     
    componentDidMount = () =>{
        var as = this.props.location.pathname 
              if(as.indexOf('home') !== -1){
                this.setState({
                    is_clcik: [1,0,0,0]
                })
              }else if (as.indexOf('table') !== -1) {
                this.setState({
                    is_clcik: [0,1,0,0]
                })
              }else if(as.indexOf('container') !== -1) {
                this.setState({
                    is_clcik: [0,0,1,0]
                })
              }else {
                this.setState({
                    is_clcik: [0,0,0,1]
                })
              }

    }
    buttonClick = (index) => {
        let arr = [0,0,0,0]
        index = parseInt(index ,10)
        arr[index] = 1
        this.setState({
            is_clcik: arr
        })
        // is_clcik = arr
        // localStorage.setItem('headButton',{'clickItem':is_clcik})
    }
    
    onLogout = () => {
        myAxiosGet('/logout',(status)=>{
            if (status) {
                localStorage.setItem('user',JSON.stringify({'user': null}))
                message.success('退出成功！！！')
                this.props.history.push({pathname:'/logout'})
            }
        })
    }
    render() {
        var username = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : null
        var clickItem =  this.state.is_clcik
        var color_button1 = clickItem[0] ? '#1DA57A' : '#fff'
        var color_button2 = clickItem[1] ? '#1DA57A' : '#fff'
        var color_button3 = clickItem[2] ? '#1DA57A' : '#fff'
        var color_button4 = clickItem[3] ? '#1DA57A' : '#fff'
        const content = (
            <Row className='userstyle' style={{ "height": "100px", "width": "100px", "textAlign": "center" }}>
                <Col style={{ "marginTop": "8px", 'backgroundColor': this.state.color }}
                    onMouseEnter={() => { this.setState({ color: "rgb(200,200,200,0.6)" }) }}
                    onMouseLeave={() => { this.setState({ color: "white" }) }}
                ><span><Icon type='user' />  &nbsp;<Link to='/home/user'><font color="#444">个人中心</font></Link></span></Col>

                <Col style={{ "marginTop": "10px", 'backgroundColor': this.state.color_1 }}
                    onMouseEnter={() => { this.setState({ color_1: "rgb(200,200,200,0.6)" }) }}
                    onMouseLeave={() => { this.setState({ color_1: "white" }) }} ><span ><Icon type='setting' />  &nbsp;<Link to='/home/setting'><font color="#444">个人设置</font></Link></span></Col>
                <Col style={{ "marginTop": "10px", 'backgroundColor': this.state.color_2 }}
                    onMouseEnter={() => { this.setState({ color_2: "rgb(200,200,200,0.6)" }) }}
                    onMouseLeave={() => { this.setState({ color_2: "white" }) }}
                >
                    <span onClick={this.onLogout.bind(this)}><Icon type='logout' />  &nbsp;<font color="#444">退出登录</font></span></Col>
            </Row>   
        )
        return (
            <div className='container-head'>
                <div className='head-sub'>
                    <div className='head-left'>
                        <a className='head-icon' href='/home'>
                            <img src={MessageSvg} alt='' />
                        </a>
                        <span className='head-search'>
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </span>
                    </div>

                    <div className='head-right'>
                        <Link to='/home' className='head-button' style={{ "color": color_button1}}   onClick={this.buttonClick.bind(this, 0)}>首页</Link>
                        <Link to='/container/table' className='head-button' style={{ "color": color_button2 }}  onClick={this.buttonClick.bind(this, 1)}>表格</Link>
                        <Link  to='/container/component' className='head-button' style={{ "color": color_button3 }}   onClick={this.buttonClick.bind(this, 2)}>组件</Link>
                        {    !username ?
                        <Link to='/login' className='head-button' style={{ "color": color_button4 }}   onClick={this.buttonClick.bind(this, 3)}>登录</Link>
                            : ''
                        }
                       {    username ?
                            <Popover content={content}   trigger="hover">
                                <Avatar shape="square" src={png} className='head-button img-author' />  &nbsp;<font color="#fff"  size='3'>{username}</font>
                            </Popover>
                        : ''    
                    }
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default Header