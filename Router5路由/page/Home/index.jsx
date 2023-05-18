import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import List from './List'
import News from './News'
import MyNavLink from '../../components/MyNavLink'
export default class index extends Component {
  render() {
    return (
            <div>
              <h2>Home组件内容</h2>
              <div>
                <ul className="nav nav-tabs">
                  <li>
                    <MyNavLink to="/home/news">News</MyNavLink>
                  </li>
                  <li>
                    <MyNavLink to="/home/list">List</MyNavLink>
                  </li>
          </ul>
          {/* 注册路由 */}
                <Routes>
                  <Route path='news' element={<News />} />
                  <Route path='/home/list' element={<List />}></Route>
                  {/* 路由重定向 */}
                </Routes>
              </div>
            </div>
    )
  }
}
