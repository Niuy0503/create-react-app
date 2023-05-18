import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import './index.css'
export default class Header extends Component {

  handleKeyup = (e) => {
    if (e.keyCode !== 13) return
    console.log(e.target.value);
    if(e.target.value.trim() === '') {
      alert('输入内容不能为空！')
      return
    }
    const todoobj = {id:nanoid(), name:e.target.value, done:false}
    this.props.addTodo(todoobj)
    e.target.value = ''
  }
  render() {
    return (
        <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" onKeyUp={this.handleKeyup}/>
        </div>
    )
  }
}