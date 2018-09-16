import React from 'react';
import ReactDOM from 'react-dom';

import './iconfont/iconfont.css';
import './style.css';
import Logo from './g.jpg'
import printMe from './print.js';
import { cube } from './math.js';

import Data from './data.xml';
import _ from 'lodash';
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
function component() {
  // const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
  var element = document.createElement('pre');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // element.innerHTML = _.join(['Hello', 'webpack2'], ' ');
  element.innerHTML = _.join(['Hello', 'webpack2'], ' ');
  element.innerHTML = [
    'Hello webpack!11',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');
  element.classList.add('hello');
  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Logo;
  element.appendChild(myIcon);
  // 打印引入的xml数据
  console.log("修改过后的内容", Data);
  // 管理输出
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;

    print();
  });

  element.appendChild(btn);


  return element;
}

let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(component());
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
    console.log(json)
  })
  .catch(error => console.error('Something went wrong when fetching this data: ', error))

  // ReactDOM.render(
  //   <h1>Hello, world!</h1>,
  //   document.getElementById('root')
  // );
console.log('111111111111111',ReactDOM)

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');

    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
  })
}


