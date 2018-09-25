import React from "react"
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>首页</h1>
        <ul>
          <li><Link to="/about">关于</Link></li>
          <li><Link to="/topic">话题</Link></li>
          <li><Link to="/home">首页</Link></li>
          <li><Link to="/list/2">列表</Link></li>
        </ul>
      </div>
    )
  }
}
