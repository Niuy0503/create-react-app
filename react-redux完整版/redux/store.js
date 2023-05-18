// 用于暴露一个store对象，整个应用只有一个store对象

import { composeWithDevTools } from 'redux-devtools-extension'
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux"; // 引入createStore，创建store对象
import countReducer from './reducers/count'// 引入为count组件服务的reducer
import personReducer from "./reducers/person";
import thunk from "redux-thunk"; // 引入redux-thunk，用来支持异步action

const allReducer = combineReducers({
    he: countReducer,
    ren:personReducer
})

const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))

export default store