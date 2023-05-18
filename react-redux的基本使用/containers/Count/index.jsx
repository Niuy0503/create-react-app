import CountUI from "../../components/Count"; // 引入UI组件

import { connect } from 'react-redux' // 引入connect用于链接UI组件和store

import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/count_action'
// mapStateToProps函数返回的对象中的key作为传递给UI组件的key，value作为传递给UI组件props的value--状态
function mapStateToProps(state) {
    return {
        count:state
    }
}
// mapDispatchToProps函数返回的对象key作为传递给UI组件props的key，value作为传递给UI组件props的value--操作状态的方法
function mapDispatchToProps(dispatch) {
    return {
        jia: (number) => {
            dispatch(createIncrementAction(number))
        },
        jian:(number) => {
            dispatch(createDecrementAction(number))
        },
        jiaAsync:(number,time) => {
            dispatch(createIncrementAsyncAction(number,time))
        }
    }
}

const CountContainer = connect(mapStateToProps,mapDispatchToProps)(CountUI) // 使用connect创建容器组件
export default CountContainer