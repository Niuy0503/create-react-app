import React, { Component } from 'react'

import { connect } from 'react-redux' // 引入connect用于链接UI组件和store

import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/actions/count'

class Count extends Component {

    increment = () => {
        const { value } = this.selectNumber
        this.props.jia(value*1)
    }
    decrement = () => {
        const { value } = this.selectNumber
        this.props.jian(value*1)
    }
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        if (this.props.count % 2 !== 0) {
        this.props.jia(value*1)
        }
    }
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.jiaAsync(value*1,1000)
    }

  render() {
    return (
            <div>
            <h1>当前求和值为：{this.props.countAll}</h1>
            <h2>下方人数为：{this.props.renshu }</h2>
          <select ref={ c => this.selectNumber = c }>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
          </select>&nbsp;
          <button onClick={this.increment}>+</button>&nbsp;
          <button onClick={this.decrement}>-</button>&nbsp;
          <button onClick={this.incrementIfOdd}>当前求和为奇数时再加</button>&nbsp;
          <button onClick={this.incrementAsync}>异步操作加</button>
    </div>
    )
  }
}

// mapStateToProps函数返回的对象中的key作为传递给UI组件的key，value作为传递给UI组件props的value--状态

// mapDispatchToProps函数返回的对象key作为传递给UI组件props的key，value作为传递给UI组件props的value--操作状态的方法
// 两种方式：函数或者对象
// function mapDispatchToProps(dispatch) {
//     return {
//         jia: (number) => {
//             dispatch(createIncrementAction(number))
//         },
//         jian:(number) => {
//             dispatch(createDecrementAction(number))
//         },
//         jiaAsync:(number,time) => {
//             dispatch(createIncrementAsyncAction(number,time))
//         }
//     }
// }

export default connect(
    state => ({ countAll: state.he, renshu:state.ren.length }),
    {
    jia: createIncrementAction,
    jian: createDecrementAction,
    jiaAsync:createIncrementAsyncAction
    }
)(Count) // 使用connect创建容器组件