import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
export default class App extends Component {
  state = {
    users:[]
  }
  saveUsers = (users) => {
    this.setState({
      users
    })
  }
  render() {
    return (
      <div className="container">
        <Header saveUsers={this.saveUsers}/>
        <List />
    </div>
    )
  }
}
