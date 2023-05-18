import React from 'react'
import Count from './containers/Count'
import store from "./redux/store"; // 引入store
export default function App() {
  return (
    <div>
      <Count store={store}/>
    </div>
  )
}

