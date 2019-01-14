import React,{ Component } from 'react'
import { Route } from 'react-router-dom';
import  Head from '../components/header/header'
import  Foot  from '../components/footer/footer'
import MyComponents from './components/index'
import MyTableList from './table/index'
class Container extends Component {
    render() {
        return(
            <div style={{ "display": "flex", "minHeight": "100vh", "flexDirection": "column",'backgroundColor': '#eee' }}>
                <Head location={this.props.location} history={this.props.history} match={this.props.match} />
                
                <div style={{
                    "flex": 1, width: '80 %',
                    'margin': '0  10%',
                    }}>
                    <Route path={this.props.match.url + '/component'} component={MyComponents} exact />
                    <Route path={this.props.match.url + '/table'} component={MyTableList} exact />
                </div>
                <Foot />
            </div>
        )
    }
}

export default Container