import React,{ Component } from 'react'
// import $ from 'jquery'
import './snake.less'
class SnakeGame extends Component {

   componentDidMount = () =>{
    let elements = [];
    (function () {
    //初始化实物x,y,width,height,color
     function Food(x,y,width,height,color) {
         //横纵坐标
         this.x = x;
         this.y = y;
         //宽和高
         this.width = width || 20;
         this.height = height || 20;
         //背景颜色
         this.color = color || "#ff0";
     }

      //为原型添加初始化的方法(作用：在页面上显示这个食物)
      //因为食物要在地图上显示,所以,需要地图的这个参数(map---就是页面上的.class=map的这个div)
     function remove() {
         elements.forEach((item,index)=>{
              item.parentNode.removeChild(item);
              elements.splice(index,1);
         })
     }

     Food.prototype.init = function (map) {
         //先删除这个小食物
         //外部无法访问的函数
         remove();

          //创建div
         var div = document.createElement("div");
         //把div加到map中
         map.appendChild(div);
         //设置div样式
         div.style.width = this.width + "px";
         div.style.height = this.height + "px";
         div.style.backgroundColor = this.color;
         //先脱离文档流
         div.style.position = "absolute";
         //随机横纵坐标
         this.x = parseInt(Math.random()*(map.offsetWidth/this.width),10)*this.width;
         this.y = parseInt(Math.random()*(map.offsetHeight/this.height),10)*this.height;
         div.style.left = this.x + "px";
         div.style.top = this.y + "px";

         //把div加入到数组elements中
         elements.push(div);
     };

          //把Food暴露给Window,外部可以使用
          window.Food = Food;
    }());




    //自调用函数---小蛇
   (function () {
       var elements = [];//存放小蛇的每个身体部分
       //小蛇的构造函数
       function Snake(width, height, direction) {
         //小蛇的每个部分的宽
         this.width = width || 20;
         this.height = height || 20;
         //小蛇的身体
         this.body = [
           {x: 3, y: 2, color: "red"},//头
           {x: 2, y: 2, color: "orange"},//身体
           {x: 1, y: 2, color: "orange"}//身体
         ];
         //方向
         this.direction = direction || "right";
       }

       //为原型添加方法--小蛇初始化的方法
       Snake.prototype.init = function (map) {
         //先删除之前的小蛇
         remove();//===========================================

         //循环遍历创建div
         for (var i = 0; i < this.body.length; i++) {
           //数组中的每个数组元素都是一个对象
           var obj = this.body[i];
           //创建div
           var div = document.createElement("div");
           //把div加入到map地图中
           map.appendChild(div);
           //设置div的样式
           div.style.position = "absolute";
           div.style.width = this.width + "px";
           div.style.height = this.height + "px";
           //横纵坐标
           div.style.left = obj.x * this.width + "px";
           div.style.top = obj.y * this.height + "px";
           //背景颜色
           div.style.backgroundColor = obj.color;
           //方向暂时不定
           //把div加入到elements数组中----目的是为了删除
           elements.push(div);
         }
       };

       //为原型添加方法---小蛇动起来
       Snake.prototype.move = function (food, map) {
         //改变小蛇的身体的坐标位置
         var i = this.body.length - 1;//2
         for (; i > 0; i--) {
           this.body[i].x = this.body[i - 1].x;
           this.body[i].y = this.body[i - 1].y;
         }
         //判断方向---改变小蛇的头的坐标位置
         switch (this.direction) {
           case "right":
             this.body[0].x += 1;
             break;
           case "left":
             this.body[0].x -= 1;
             break;
           case "top":
             this.body[0].y -= 1;
             break;
           case "bottom":
             this.body[0].y += 1;
             break;
         }

         //判断有没有吃到食物
         //小蛇的头的坐标和食物的坐标一致
         var headX=this.body[0].x*this.width;
         var headY=this.body[0].y*this.height;
         //判断小蛇的头的坐标和食物的坐标是否相同
         if(headX==food.x&&headY==food.y){
           //获取小蛇的最后的尾巴
           var last=this.body[this.body.length-1];
           //把最后的蛇尾复制一个,重新的加入到小蛇的body中
           this.body.push({
             x:last.x,
             y:last.y,
             color:last.color
           });
           //把食物删除,重新初始化食物
           food.init(map);
         }
       }
       ;//删除小蛇的私有的函数=============================================================================
       function remove() {
         //删除map中的小蛇的每个div,同时删除elements数组中的每个元素,从蛇尾向蛇头方向删除div
         var i = elements.length - 1;
         for (; i >= 0; i--) {
           //先从当前的子元素中找到该子元素的父级元素,然后再弄死这个子元素
           var ele = elements[i];
           //从map地图上删除这个子元素div
           ele.parentNode.removeChild(ele);
           elements.splice(i, 1);
         }
       }

       //把Snake暴露给window,外部可以访问
       window.Snake = Snake;
     }());





    (function () {
        var that = null; //该变量的目的就是为了保存游戏Game的实例对象-------
        //游戏的构造函数
        function Game(map) {
            this.food = new Food(); //食物对象
            this.snake = new Snake();//小蛇对象
            this.map = map; //地图
            that = this; //初始化时，保存当前的实例对象到that变量中-----------------此时that就是this
        };

        //初始化游戏
        //食物初始化
        Game.prototype.init = function () {
            this.food.init(this.map);
            this.snake.init(this.map);

            //小蛇移动
            this.runSnake(this.food,this.map);
            //调用按键的方法
            this.bindKey();
        }

         //添加原型方法---设置小蛇可以自动的跑起来
         Game.prototype.runSnake = function (food, map) {

           //自动的去移动
           var timeId = setInterval(function () {
             //此时的this是window
             //移动小蛇
             this.snake.move(food, map);
             //初始化小蛇
             this.snake.init(map);
             //横坐标的最大值
             var maxX = map.offsetWidth / this.snake.width;
             //纵坐标的最大值
             var maxY = map.offsetHeight / this.snake.height;
             //小蛇的头的坐标
             var headX = this.snake.body[0].x;
             var headY = this.snake.body[0].y;
             //横坐标
             if (headX < 0 || headX > maxX) {
               //撞墙了,停止定时器
               clearInterval(timeId);
           
             }
             //纵坐标
             if (headY < 0 || headY > maxY) {
               //撞墙了,停止定时器
               clearInterval(timeId);
              //  alert("游戏结束");
             }
           }.bind(that), 150);
         };

         //添加原型方法---设置用户按键,改变小蛇移动的方向
         Game.prototype.bindKey=function () {

           //获取用户的按键,改变小蛇的方向
           document.addEventListener("keydown",function (e) {
             //这里的this应该是触发keydown的事件的对象---document,
             //所以,这里的this就是document
             //获取按键的值
             switch (e.keyCode){
               case 37:this.snake.direction="left";break;
               case 38:this.snake.direction="top";break;
               case 39:this.snake.direction="right";break;
               case 40:this.snake.direction="bottom";break;
             }
           }.bind(that),false);
         };

        //把Game暴露给window,外部就可以访问Game对象了
        window.Game = Game;
    }());

       var gm = new Game(document.querySelector("#map"));
       gm.init();
   } 
    render() {
        return (
            <div id='map'>
                
            </div>
        )
    }
}
export default SnakeGame