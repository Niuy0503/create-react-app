import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'
export default class App extends Component { 
  state = {
    todoList:[
      {id:1, name:'睡觉', done:false},
      {id:2, name:'吃饭', done:false},
      {id:3, name:'学React', done:false}
    ]
  }

  addTodo = (todoobj) => {
    const {todoList} = this.state
    const newtodoList = { todoobj, ...todoList }
    this.setState({
      todoList: newtodoList
    })
  }

  updateTodo = (id,done) => {
    const {todoList} = this.state
   const newtodoList = todoList.map((todoobj) => {
      if(todoobj.id === id) return {...todoobj, done}
      else return todoobj
    })
    this.setState({
      todoList:newtodoList
    })
  }

  deleteTodo = (id) => {
    const {todoList} = this.state
    const newtodoList = todoList.filter((todoobj) => {
      return todoobj.id !== id
    })
    this.setState({
          todoList:newtodoList
        })
  }

  handleCheckAlltodo = (done) => {
    const {todoList} = this.state
    const newtodoList = todoList.map((todoobj) => {
      return {...todoobj, done}
    })
    this.setState({
          todoList:newtodoList
        })
  }

  handleClean = () => {
    const {todoList} = this.state
    const newtodoList = todoList.filter((todoobj) => {
      return !todoobj.done
    })
    this.setState({
              todoList:newtodoList
            })
  }
  render() {
    const { todoList } = this.state
    return (
        <div className="todo-container">
    <div className="todo-wrap">
        <Header addTodo={this.addTodo}/>
        <List todoList={ todoList } updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
        <Footer todoList={ todoList } handleCheckAlltodo={this.handleCheckAlltodo} handleClean={this.handleClean}/>
    </div>
  </div>
    )
  } 
}