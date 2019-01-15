import React from 'react'
import ReactDOM from 'react-dom'
import RouterWrap from './router'
import { Provider } from 'react-redux'
import store from './store'
 
ReactDOM.render(
    <div>
        <Provider store={store}>

            <RouterWrap/>

        </Provider>

    </div>,
    document.getElementById('root')
)
 
