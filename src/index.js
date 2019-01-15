import React from 'react'
import ReactDOM from 'react-dom'
import RouterWrap from './router'
import { Provider } from 'react-redux'
import store from './store'
 import registerServiceWorker from './registerServiceWorker'
    const render = (App) =>{
            ReactDOM.render(
            <div>
                <Provider store={store}>

                    <App/>

                </Provider> 

            </div>,
            document.getElementById('root')
        )
    }
    render(RouterWrap)  

 if (module.hot) {
     module.hot.accept('./router',()=>{
         render(RouterWrap)
     })
 }
 registerServiceWorker()