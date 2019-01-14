import React, { Component } from 'react'
import {
    Comment,  Form, Button, List, Input, message,
} from 'antd'
import moment from 'moment'
import './index.less'
import { myAxiosGet,myAxiosPost } from '../axios/index'
import getTime from '../tools/getTime'
var img_url_path = localStorage.getItem('img_url_path')
var path = require('path')

const TextArea = Input.TextArea

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
        style={{'backgroundColor':'#fff','borderBottom':'1px solid #ccc'}}
    />
)
const Editor = ({
    onChange, onSubmit, submitting, value,
}) => (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                    style={{'float': 'right'}}
                >
                    发表评论
                </Button>
            </Form.Item>
        </div>
    )
class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        }
    }

    // shouldComponentUpdate = (nextProps, nextState) => {
    //     if (nextState === this.state) {
    //         return false
    //     }
    // }

    componentDidMount = () => {
        var id = this.props.data.content_id
        myAxiosGet(`/comment?content_id=${id}`,(status,result) => {
            if (status) {
                
                let comment = []
                for (let index = 0; index < result.length; index++) {
                    let time = getTime.getTime(new Date(),result[index].datetime);
                    let commentItem = {
                        'author': result[index].author,
                        'avatar':  'http://'+ path.join(img_url_path,'/public/img/as.jpg'),
                        'content': <p>{result[index].content}</p>,
                        'datetime': time,
                    }
                    comment.push(commentItem)
                }
                this.setState({
                    comments:comment
                })
               
            }
        })  
    }


    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });
        var commentItem = {
            'author': JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : '',
            'avatar':  '/public/img/as.jpg',
            'content': <p>{this.state.value}</p>,
            'datetime': moment().fromNow(),
            'content_id': this.props.data.content_id
        }

        
        setTimeout(() => {
            
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    commentItem
                    ,
                    ...this.state.comments,
                ],
            });
        }, 1000);
        commentItem.content = this.state.value 
        commentItem.datetime = Date.now()
        myAxiosPost('/comment/add',{'info':commentItem},function (status,result) {
            if (status) {
                message.success('发表成功!！')
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        const { comments, submitting, value } = this.state;
        var user =  JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : ''
        return (
            <div className='comments-container'>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    className='comments-body'
                    style={{'backgroundColor':'#fff'}}
                    // avatar={(
                    //     <div className='comments-avatar'>
                    //        <Avatar
                    //         src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    //         alt="Han Solo"
                    //         />
                            /* <span className='comments-auto'>sssss</span>  */
                        // </div>
                    // )}
                    content={(
                        user ?
                        <Editor
                            onChange={this.handleChange.bind(this)}
                            onSubmit={this.handleSubmit.bind(this)}
                            submitting={submitting}
                            value={value}
                            // disable={true}
                        />
                        :
                        <p>请先登录在评论</p>
                    )}
                />
            </div>
        )
    }
}

export default Content