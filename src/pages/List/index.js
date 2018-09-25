import React from "react"
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>列表</h1>
        <ul>
          <li><Link to="/about">列表1</Link></li>
          <li><Link to="/topic">列表2</Link></li>
          <li><Link to="/home">列表3</Link></li>
        </ul>
      </div>
    )
  }
}
