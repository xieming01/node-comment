import React from 'react'
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import { Button } from 'antd';

export default class NotFounded extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  goBack = () => {
    this.props.history.push('list/3')
  }
  render() {
    return (
      <div>
        <Link to="/home">返回首页</Link>
        <Button onClick={this.goBack} type="primary">返回首页</Button>
        <h1>404</h1>
      </div >
    )
  }
}


