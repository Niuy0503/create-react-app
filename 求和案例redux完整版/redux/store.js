// 用于暴露一个store对象，整个应用只有一个store对象


import { legacy_createStore as createStore, applyMiddleware } from "redux"; // 引入createStore，创建store对象
import countReducer from './count_reducer'// 引入为count组件服务的reducer
import thunk from "redux-thunk"; // 引入redux-thunk，用来支持异步action

const store = createStore(countReducer,applyMiddleware(thunk))

export default store