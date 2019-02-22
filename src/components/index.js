import React,{ Component } from 'react'
import { Route } from 'react-router-dom';
import  Head from './header/header'
import  Foot  from './footer/footer'
import All from './body/all/all'
import Ask from './body/ask/ask'
import Share from './body/share/share'
import Good from './body/good/good'
import Contents from './body/body/body'
import allDetail from './subpage/allContent/detail'
// import goodDeatil from './subpage/goodContent/detail'

class Components extends Component {
     
    render() {
        console.log(this.props)
        return(
            <div style={{ "display": "flex", "minHeight": "100vh", "flexDirection": "column",'backgroundColor': '#eee' }}>
                <Head location={this.props.location} history={this.props.history} match={this.props.match} />
                
                <div style={{
                    "flex": 1, width: '80 %',
                    'margin': '0  10%',
                    
                    }}>
                    <Contents location={this.props.location} history={this.props.history} match={this.props.match} />
                    <Route path={this.props.match.url + '/all'} component={All} exact />
                    <Route path={this.props.match.url + '/ask'} component={Ask} exact />
                    <Route path={this.props.match.url + '/share'} component={Share} exact />
                    <Route path={this.props.match.url + '/good'} component={Good} exact />
                    <Route path={this.props.match.url + '/'} component={All} exact />
                    <Route path={this.props.match.url + '/all/:id'} component={allDetail} exact />
                    {/* <Route path={this.props.match.url + '/good/:id'} component={goodDeatil} exact /> */}
                </div>
                <Foot />
            </div>
        )
    }
}

export default Components