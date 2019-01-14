import React, { Component } from 'react'
import './detail.less'
import Content from '../../content/index'
import { connect } from 'react-redux'
import { getListDetail } from '../../../action/action'
import getTime from '../../tools/getTime'
// var path = require('path')
// var img_url_path = localStorage.getItem('img_url_path')
class allDeatil extends Component {
    componentDidMount = () => {
        let id = this.props.match.params.id
        this.props.getListDetail(id)
        // myAxiosCopy()
    }
 
    componentWillReceiveProps = (nextProps) => {
         if(this.props.data.result === nextProps.data.result) {
             return false
         }
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
          var content = this.props.data.result ? this.props.data.result : {}
          var dateToNow = getTime.getTime(new Date(),content.date_to_now)
          var keyword = this.showKeyword(content) 
          var propsdata = {'author':content.author,'content_id': this.props.match.params.id}
        return (
            (
               !(content instanceof Array)?  
            <div className='detail-container'>
                <div className='title'>
                    {content.title}
                </div>
                <div className='sub-title'> 
                    <span>
                        发布于 7 天前 | 作者 {content.author}| {content.reader_num} 次浏览 | 最后一次编辑是 {dateToNow} 天前 | 来自 {keyword}
                    </span>
                </div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: content.content}} className='detail-content'></div>
                 <div className='detail-comment'>
                    <Content  data={propsdata}/>
                 </div>
            </div>
            : ''
            )
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        data: state.detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListDetail: (id) => {
             dispatch(getListDetail(id))
         }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(allDeatil)
// export default allDeatil