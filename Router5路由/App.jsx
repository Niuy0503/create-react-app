import React, { Component } from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import Home from './page/Home' // 路由组件
import About from './page/About'
import Header from './components/Header'
import MyNavLink from './components/MyNavLink'
export default class App extends Component {
  render() {
    return (
  <div>
<Header />
    <div className="row">
      <div className="col-xs-2 col-xs-offset-2">
        <div className="list-group">
          {/* <a className="list-group-item" href="./about.html">About</a>
          <a className="list-group-item active" href="./home.html">Home</a> */}

              
              {/* 在react中通过路由连接实现切换组件 */}
              {/* <NavLink className={({ isActive }) => 'list-group-item' + (isActive ? ' demo' : '')} to='/about'>About</NavLink>
              <NavLink  className={({ isActive }) => 'list-group-item' + (isActive ? ' demo' : '')} to='/home'>Home</NavLink> */}
              <MyNavLink to='/about'>about</MyNavLink>
              <MyNavLink to='/home'>home</MyNavLink>
        </div>
      </div>
      <div className="col-xs-6">
        <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Routes>
                  <Route path='/about' element={<About />}></Route>
                  <Route path='/home' element={<Home />}></Route>
                  {/* 路由重定向 */}
                  <Route path='/' element={<Navigate to="/home" />}></Route>
                </Routes>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
