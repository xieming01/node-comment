import React,{ Component } from 'react'
import { Link  } from 'react-router-dom'
import { Button } from 'antd'
import './body.less'
const subTiitle = ['全部','精华','分享','问答']
const ketArr = ['all','good','share','ask']
class Contents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_selected:[1,0,0,0],
            
        }
    }

    componentDidMount = () => {
        const location = this.props.location.pathname.split('/')
        var locationSplice = location.splice(0, 3)
        var current = locationSplice.length ? locationSplice[locationSplice.length - 1] : 'all'
        switch (current) {
            case 'all':
                this.setState({
                    is_selected: [1, 0, 0, 0]
                })
                break;
            case 'good':
                this.setState({
                    is_selected: [0, 1, 0, 0]
                })
                break;
            case 'share':
                this.setState({
                    is_selected: [0, 0, 1, 0]
                })
                break;
            case 'ask':
                this.setState({
                    is_selected: [0, 0, 0, 1]
                })
                break;
            default:
                break;
        }
    }
    handleClick = (key) => {
        switch (key) {
            case 'all':
                this.setState({
                    is_selected: [1, 0, 0, 0]
                })
                break;
            case 'good':
                this.setState({
                    is_selected: [0, 1, 0, 0]
                })
                break;
            case 'share':
                this.setState({
                    is_selected: [0, 0, 1, 0]
                })
                break; 
            case 'ask':
                this.setState({
                    is_selected: [0, 0, 0, 1]
                })
                break;      
            default:
                break;
        }
    }
    render(){
        let  is_selected  = this.state.is_selected        
        let arr = subTiitle.map((item,index)=>{
            return (
                <Button className='sub-item' key={ketArr[index]} onClick={this.handleClick.bind(this, ketArr[index])} 
                style={{"backgroundColor": is_selected[index] ? 'rgba(0, 0, 0, 0.25)' : '#eee'}}> 
                <Link className='sub-link' to={{ pathname: `/home/${ketArr[index]}`, state: { tab: ketArr[index] } }}>{item}</Link>
                 </Button> 
            )
        })
        let length = this.props.location.jquery ? this.props.location.jquery.is_show : true

        // var is_show = length >= 4 ? false : true
        return(

           (length ? 
                <div className='sub-title'>
                    {arr} 
                </div>
            : ''
            )
        )
    }
}

export default Contents