import React from 'react';
// import ReactDOM from 'react-dom';
import { Tabs, Button, Divider ,  } from 'antd';
import Basic from './baisc';
import TimeSelect from './timeSelct';
import Rule from './rule';
import Email from './email';
// import PropTypes from "prop-types";
const TabPane = Tabs.TabPane;
var dataAll={};
class TabDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            activeKey:"1",
            // operations:''
        }
    }
    //   // 父组件声明自己支持 context
    // static childContextTypes = {
    //     getInstance: PropTypes.func,
    // }
    // // 父组件提供一个函数，用来返回相应的 context 对象
    // getChildContext() {
    //     return {
    //         getInstance: this.getInstance.bind(this)
    //     }
    // }
    callback=(key)=> {
        this.setState({
            activeKey:key
        })
    }
    onButtonClick = (key) =>{
        switch (key) {
            case "cancle":
               dataAll={};
               this.props.onClose();
                break;
            case "firstNext":
                dataAll.basic = this.childCp.onSubmit();
                if (dataAll.basic){
                  this.setState({
                    activeKey: '2'
                });  
                };
                break;
            case "firstLast":
                dataAll.basic={};
                this.setState({
                    activeKey: '1'
                });
                break;
            case "secondNext":
                dataAll.time=this.childCp2.onSubmit();
                if(dataAll.time){
                   this.setState({
                    activeKey: '3'
                }); 
                };
                break;
            case "secondLast":
                dataAll.time={};
                this.setState({
                    activeKey: '2'
                });
                break;
            case "thirdNext":
                dataAll.rule = this.childCpt3.onSubmit();
                this.setState({
                    activeKey: '4'
                });
                break;
            case "thirdLast":
                dataAll.rule = {};
                this.setState({
                    activeKey: '3'
                });
                break;
            case "save":
                dataAll.email=this.childCps.onSubmit();
                dataAll.basic = this.childCp.onSubmit();
                dataAll.time = this.childCp2.onSubmit();
                dataAll.rule = this.childCpt3.onSubmit();
                this.props.onClose();
                break;
            default:
                break;
        }
    }
    render(){
        var { activeKey,  } = this.state;
        var operations;
        switch (activeKey) {
            case "1":
                operations = <div ><Button onClick={this.onButtonClick.bind(this, "cancle")} >取消</Button>&nbsp;<Button type="primary" onClick={this.onButtonClick.bind(this, "firstNext")} >下一步</Button > </div>
                break;

            case "2":
                 
                    operations= <div><Button onClick={this.onButtonClick.bind(this, "cancle")}>取消</Button>&nbsp;<Button onClick={this.onButtonClick.bind(this, "firstLast")} type="primary">上一步</Button> &nbsp;<Button onClick={this.onButtonClick.bind(this, "secondNext")} type="primary">下一步</Button> </div>
 
                break;
            case "3":
                 
                    operations= <div><Button onClick={this.onButtonClick.bind(this, "cancle")}>取消</Button>&nbsp;<Button type="primary" onClick={this.onButtonClick.bind(this, "secondLast")}>上一步</Button> &nbsp;<Button onClick={this.onButtonClick.bind(this, "thirdNext")} type="primary">下一步</Button> </div>
                 
                break;
            case "4":
               
                operations = <div><Button onClick={this.onButtonClick.bind(this, "cancle")}>取消</Button>&nbsp;<Button type="primary" onClick={this.onButtonClick.bind(this, "thirdLast")}>上一步</Button>&nbsp;<Button onClick={this.onButtonClick.bind(this, "save")} type="primary">保存</Button></div>
                 
                break;
            default:
                break;
        }
       
        return(
            <div>
                <Tabs type="card" activeKey={ activeKey} onChange={this.callback.bind(this)}   className="tabds" style={{"height":"375px"}}>
                    <TabPane tab="基本属性" key="1" >
                        <Basic wrappedComponentRef={(constance) => { this.subTable = constance }} getInstance={(childCp) => { this.childCp = childCp; }}/>
                    </TabPane>
                    <TabPane tab="时间选择" key="2"><TimeSelect wrappedComponentRef={(constance2) => { this.subTable2 = constance2 }} getInstance={(childCp2) => { this.childCp2 = childCp2; }}/></TabPane>
                    <TabPane tab="告警规则" key="3"><Rule wrappedComponentRef={(constancet3) => { this.subTablet3 = constancet3 }} getInstance={(childCpt3) => { this.childCpt3 = childCpt3; }}/></TabPane>
                    <TabPane tab="邮件通知" key="4"><Email wrappedComponentRef={(constances) => { this.subTables = constances }} getInstance={(childCps) => { this.childCps = childCps; }}/></TabPane>
                </Tabs>
                <Divider style={{"marginTop":"0px"}} />
                <div style={{"float":"right"}}>{operations}</div>
            </div>
        )
    }
}
export default TabDetail