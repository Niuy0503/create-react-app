import React, { Component } from 'react'
import { nanoid } from 'nanoid'

export default class Person extends Component {
    addPerson = () => {
        const name = this.nameNode.value
        const age = this.ageNode.value
        const personobj = {id:nanoid(), name, age}
    }
  render() {
    return (
        <div>
            <h1>Person组件</h1>
            <input type="text" placeholder='输入名字' ref={c => this.nameNode = c} />
            <br />
            <br />
            <input type="text" placeholder='输入年龄' ref={c => this.ageNode = c} />
            <br />
            <br />
          <button onClick={this.addPerson}>添加person</button>
    </div>
    )
  }
}
