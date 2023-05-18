import React, { Component } from 'react'
import  PropTypes  from 'prop-types'
import Item from '../Item'
import './index.css'
export default class List extends Component {

  static propTypes = {
    todoList: PropTypes.array.isRequired,
    updateTodo:PropTypes.func.isRequired,
    deleteTodo:PropTypes.func.isRequired,
  }

  render() {
    const { todoList, updateTodo, deleteTodo } = this.props
    return (
      <ul className="todo-main">
        {
          todoList.map(todo => {
            // <Item key={item.id} id={item.id} name={item.name} done={item.done}/>
            return (
            <Item 
            key={todo.id}
            {...todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo} 
            />
            )
          })
        }
      </ul>
    )
  }
}
