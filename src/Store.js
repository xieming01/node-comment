import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

// import {reducer as todoReducer} from './todos';
// import {reducer as filterReducer} from './filter';

// import Perf from 'react-addons-perf'

const win = window;
// win.Perf = Perf

const reducer = combineReducers({
//   todos: todoReducer,
//   filter: filterReducer
});

// 中间件合集
const middlewares = [];
// redux-immutable-state-invariant 是redux的一个中间件，避免reducer纯函数是否擅自修改了state
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant'));
// }
/**
 * @description 使createStore函数产生的store对象具有更多更强的功能。
 */
// const storeEnhancers = compose(
//   applyMiddleware(...middlewares),
//   (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
// );

export default createStore(reducer, {});