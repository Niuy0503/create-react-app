import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'


ReactDOM.render(
    // Provider包裹app，目的是让app的所有后代组件接收到store
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')) 

// 监测redux中状态的改变，如果redux中的状态发生改变，就会重新渲染App组件
// store.subscribe(() => {
//         ReactDOM.render(
//         <App />,
//     document.getElementById('root'))
//     })