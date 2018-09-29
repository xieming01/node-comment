import React from "react";
import ReactDom from "react-dom";
import { Button, Switch } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Routes from './routes'
import styles from './index.less'
import Pic from './assets/g.jpg'


// console.log(22)
// TODO:你好
const Div = document.createElement("div");
Div.setAttribute("id", "root")
document.body.appendChild(Div)
/**
 *
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component{
  render(){
    return (
      <div>
        <h1 className={styles.green}>hello, world!</h1>
        <img src={Pic}></img>
        <Button type="primary">Primary</Button>
        <Switch defaultChecked />
        <Router>
          <Routes />
        </Router>
      </div>
    )
  }
}
ReactDom.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);
