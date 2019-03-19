import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import $ from "jquery";
import "./droplist.css";
class DropList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropData: [],
            dropPosition: { x: "0px", y: "0px" },
            isexist: false,
        }
    }
    componentDidMount() {
        
        this.setState({
            dropData: this.props.dropData,
            dropPosition: this.props.dropPosition,
            isexist: this.props.isexist,

        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dropData: nextProps.dropData,
            dropPosition: nextProps.dropPosition,
            isexist: nextProps.isexist,

        })
    }
    
    render() {
        return (
            (
                this.state.isexist ?
                    <div
                        className="drcontainer"
                        style={{
                            left: this.state.dropPosition.x,
                            top: ((parseInt(this.state.dropPosition.y,10) + 480) + 'px')
                        }}
                    >
                        <ul
                        >
                            {
                                this.state.dropData && this.state.dropData.length > 0 ?
                                    this.state.dropData.map((item) => {
                                        return (
                                            <li key={item.key}
                                                onMouseEnter={() => {
                                                    $(this).css("background-color", "#ccc");
                                                }}
                                                onMouseLeave={() => {
                                                    $(this).css("background-color", "#fff");
                                                }}
                                            >
                                                <div style={{ minWidth: '120px', display: "inline-block" }} >{item.name}</div>
                                            </li>
                                            // <li key={item.key}>
                                            //     <div style={{ minWidth: '120px', display: "inline-block" }}   >
                                            //         <Link to={item.url}>    {item.name} </Link>
                                            //     </div>
                                            // </li>
                                        )
                                    })
                                :
                                    ''
                            }
                        </ul>
                    </div>
                    : ''
            )
        )
    }
}
export default DropList