import React, { Component } from 'react'
 import { Link } from 'react-router-dom'
 import { Popover,Pagination  } from 'antd'
 import { connect } from 'react-redux'
 import { getList } from '../../../action/action'
 import getTime from '../../tools/getTime'
import './good.less'
localStorage.setItem('img_url_path','120.79.10.3:5000')
var path = require('path')
var pageSize = 15
class Good extends Component {
    constructor(props){
        super(props)
        this.state={
            currentPage: 1
        }
    }

    componentDidMount = () => {
        this.props.getList('good')
    }
 
    componentWillReceiveProps = (nextProps) => {
         if(this.props.data.result === nextProps.data.result) {
             return false
         }
    }
    pageChnage = (page) => {
         this.setState({
             currentPage: page
         })
    }
    render() {
        var listItem = []
        var { currentPage } = this.state
        var listArr = (this.props.data.result && this.props.data.result.length) ? this.props.data.result : []
        var img_url_path = localStorage.getItem('img_url_path')
        // var pageNum = ((listArr.length + 1)/10 === 0)&&listArr.length? parseInt((listArr.length + 1)/10, 10) :  parseInt((listArr.length + 1)/10, 10) +1;
        if(listArr.length) {
            var listSlice = listArr.slice((currentPage-1)*pageSize,currentPage*pageSize)
            
            listSlice.forEach((item,index)=>{
                var dateToNow = getTime.getTime(new Date(),item.date_to_now)
                // var keyword = this.showKeyword(item)        
                listItem.push(<div className='good-container' key={index + 'k'}>
                    <span className='good-avatar' ><img src={'http://'+path.join(img_url_path,item.img_url)} alt="" /></span>
                    <span>
                        <Popover content='回复数' trigger="hover" className='good-reply'>
                            <span style={{ "fontSize": '15px', 'fontWeight': '700' }}>{item.reply_num}</span>/
                        </Popover>

                        <Popover content='点击数' trigger="hover" className='good-click'>
                            <span className='good-click' >{item.reader_num}</span>
                        </Popover>
                    </span>
                    <span className='good-sign' style={{"backgroundColor":item.top ? '#80bd01' :'#ccc'}}>精华</span><Link to={{pathname:`/home/all/${item._id}`,jquery:{'is_show': false}}} className='good-chart'>{item.title}</Link>
                    <span className='good-author'>
                        <a>{item.author} </a>
                        <span className='good-time'>{dateToNow}</span>
                    </span>
                </div>)
            })
        }
    
        return (
            <div>
                {listItem}
                <div>
                   <Pagination   total={listArr.length}  pageSize={pageSize} defaultCurrent={this.state.currentPage} onChange={this.pageChnage.bind(this)}/> 
                </div>
                
            </div>
        )
    }
}

    const mapStateToProps = (state) => {
        // console.log(state)
        return {
            data: state.result
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            getList: (tab) => {
                dispatch(getList(tab))
            }
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Good)