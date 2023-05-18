import React, { Component } from 'react'
import './index.css'
export default class Footer extends Component {

  handleCheckAll = (e) => {
    this.props.handleCheckAlltodo(e.target.checked)
  }
  handleClean = () => {
    this.props.handleClean()
  }

  render() {
    const { todoList } = this.props
    const doneCount = todoList.reduce((pre,item) => {
      return pre += (item.done ?  1 : 0 ) 
    },0)
    const total = todoList.length

    return (
            <div className="todo-footer">
        <label>
          <input type="checkbox" checked={doneCount === total && total !== 0 ? true : false } onChange={this.handleCheckAll}/>
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
        <button className="btn btn-danger" onClick={this.handleClean}>清除已完成任务</button>
      </div>
    )
  }
}
