import React,{ Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Components from './components/index'
import Login from './components/login/login'
import Register from './components/login/register/register'
import Container from './container/index'
class RouterWrap extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route path='/home' component={Components} />
                            <Route path='/container' component={Container} />
                            <Route path='/login' component={Login} />
                            <Route path='/register' component={Register} />
                            <Route path='/logout' component={()=> <Redirect to='/login'/>} />
                            <Route path='/' component={()=> <Redirect to='/home'/>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default RouterWrap