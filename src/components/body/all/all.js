import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Popover,Pagination  } from 'antd'
import { connect } from 'react-redux'
import { getList } from '../../../action/action'
import getTime from '../../tools/getTime'
import './all.less'
localStorage.setItem('img_url_path','127.0.0.1:5000')
var path = require('path')
// var keywordArr = {'0': '置顶','1': '分享','2': '问答','3': '精华'}
var pageSize = 15
class All extends Component {
    constructor(props){
        super(props)
        this.state={
            currentPage: 1
        }
    }
   componentDidMount = () => {
       this.props.getList('all')
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
   showKeyword = (item) => {
    let word = ''
        if (item.top) {
            word = '置顶'
            return word
        }
        if(item.good){
            word =  '精品'
            return word
        }
        switch (item.tab) {
            case 'share':
                word = '分享'
                return word
             
            case 'ask':
                word = '问答'
                return word
               
            default:
                break;
        }
   }
    render() {
        var listItem = []
        var { currentPage } = this.state
        var listArr = this.props.data.result.length ? this.props.data.result : []
        var img_url_path = localStorage.getItem('img_url_path')
        // var pageNum = ((listArr.length + 1)/10 === 0)&&listArr.length? parseInt((listArr.length + 1)/10, 10) :  parseInt((listArr.length + 1)/10, 10) +1;
        if(listArr.length) {
            var listSlice = listArr.slice((currentPage-1)*pageSize,currentPage*pageSize)
            
            listSlice.forEach((item,index)=>{
                var dateToNow = getTime.getTime(new Date(),item.date_to_now)
                var keyword = this.showKeyword(item)        
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
                    <span className='good-sign' style={{"backgroundColor":item.top ? '#80bd01' :'#ccc'}}>{keyword}</span><Link to={{pathname:`/home/all/${item._id}`,jquery:{'is_show': false}}} className='good-chart'>{item.title}</Link>
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
                   <Pagination   total={listArr.length}  pageSize={pageSize} defaultCurrent={currentPage} onChange={this.pageChnage.bind(this)}/> 
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
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

export default connect(mapStateToProps,mapDispatchToProps)(All)


// <div className='all-container'>
            //     <div className='all-title'>
            //         <span className='all-avatar' ><img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3515920666,1677097457&fm=58" alt="Han Solo" /></span>
            //     </div>
            //     <div className='all-sub'>
                    
            //         <div className='all-content'>
            //             <span type='primary' className='all-sign'>置顶</span><Link to='/home/all/1' className='all-chart'>第13届D2前端技术论坛将于2019年1月6日在杭州举办，6大主题方向等你来听</Link>
            //         </div>
            //         <div className='all-author'>
            //             <a>Han Solo </a>   <span className='all-time'>2分钟</span>
            //         </div>
            //     </div>
            // </div>