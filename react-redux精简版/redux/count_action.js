// 生成action对象
import { INCREMENT, DECREMENT } from './constant'
// 同步action，返回值是object一般对象
 export function createIncrementAction(data) {
    return {type:INCREMENT,data}
}

export function createDecrementAction(data) {
    return {type:DECREMENT,data}
}
// 异步action，指返回值为函数,  异步action中一般都会调用同步action
export function createIncrementAsyncAction(data, time) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        },time)
    }
}