import React, { Component } from 'react'
import axios from 'axios';
export default class Header extends Component {
    handleSearch = () => {
        console.log(this.keyword.value);
        axios.get(
            `/api1/search/users?q=${this.keyword.value}`
        ).then(
            response => {
                console.log(response.data);
            },
            error => {
                console.log(error);
            }
        )
    }

  render() {
    return (
      <div>
        <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text" placeholder="输入关键词搜索" ref={c => this.keyword = c}/>&nbsp;
          <button onClick={this.handleSearch}>搜索</button>
        </div>
      </section> 
      </div>
    )
  }
}
