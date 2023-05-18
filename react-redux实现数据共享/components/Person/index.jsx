import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'
import { createAddPersonAction } from '../../redux/actions/person'
 class Person extends Component {
    addPerson = () => {
        const name = this.nameNode.value
        const age = this.ageNode.value
      const personobj = { id: nanoid(), name, age }
      this.props.add(personobj)
      this.nameNode.value = ''
      this.ageNode.value = ''
    }
  render() {
    return (
        <div>
        <h1>Person组件</h1>
        <h2>上方求和为：{ this.props.count }</h2>
            <input type="text" placeholder='输入名字' ref={c => this.nameNode = c} />
            <br />
            <br />
            <input type="text" placeholder='输入年龄' ref={c => this.ageNode = c} />
            <br />
            <br />
        <button onClick={this.addPerson}>添加person</button>
        <ul>
          {
            this.props.persons.map(item => {
              return <li key={item.id}>{item.name}---{item.age}</li>
            })
          }
        </ul>
    </div>
    )
  }
}

export default connect(
    state => ({ persons: state.ren, count:state.he }),
  {
      add:createAddPersonAction
    }
)(Person)