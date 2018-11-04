import React from "react";
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import NotFounded from './pages/404'
import Home from './pages/Home'
import List from './pages/List'
import Todo from './pages/Todo'

function Routes(props) {
  return (

    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/todo" component={Todo} />
      <Route exact path="/list/:id" component={List} />
      {/* 404 */}
      <Route component={NotFounded} />

    </Switch>

  )
}
export default Routes
