import { createStore,combineReducers,applyMiddleware } from 'redux'
import { reducer,reducerDetail } from './reducer/reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddlewares from 'redux-promise'

const reducers = combineReducers({
    'result': reducer,
    'detail': reducerDetail
})
const store = createStore(
    reducers,
    applyMiddleware(thunk ,logger)
)

export default store