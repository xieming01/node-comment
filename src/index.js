import React from "react";
import ReactDom from "react-dom";
import { Button } from 'antd';
import 'antd/lib/button/style/css';
import styles from './index.css'
import Pic from './g.jpg'

console.log(22)
ReactDom.render(
  <div>
    <h1 className={styles.green}>hello, world!333</h1>
    <img src={Pic}></img>
    <Button type="primary">Primary</Button>
  </div>,
  document.getElementById("root")
);
