import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
export default function Message() {

  const [messages] = useState([
    {
      id:'001',title:'消息1',content:'第一次遇見阴天遮住你侧脸'
    },
    {
      id:'002',title:'消息2',content:'有什么故事好想了解'
    },
    {
      id:'003',title:'消息3',content:'我感觉我懂你的特别~'
    },
    {
      id:'004',title:'消息4',content:'你的心有一道墙'
    }
  ])
  const navigate = useNavigate()

  function show (item) {
    navigate('msgs', {
      state: {
        id: item.id,
        title: item.title,
        content: item.content
      }
    })
  }
  return (
    // params传参
    // <div>
    //   <ul>
    //     {
    //       messages.map(item => {
    //         return (
    //           <li key={item.id}>
    //             <Link to={`msgs/${item.id}/${item.title}/${item.content}`}>{item.title}</Link>
    //           </li>
    //         )
    //       })
    //     }
    //   </ul>
    //   <Outlet />
    // </div>

    // search传参
    //     <div>
    //   <ul>
    //     {
    //       messages.map(item => {
    //         return (
    //           <li key={item.id}>
    //             <Link to={`msgs?id=${item.id}&title=${item.title}&content=${item.content}`}>{item.title}</Link>
    //           </li>
    //         )
    //       })
    //     }
    //   </ul>
    //   <Outlet />
    // </div>
    // state传参
    <div>
      <ul>
        {
          messages.map(item => {
            return (
            <div>
              <li key={item.id}>
                <Link to='msgs' state={{id:item.id, title:item.title, content:item.content}}>{item.title}</Link>
              </li>
                <button onClick={() => show(item)}>查看</button>
            </div>
            )
          })
        }
      </ul>
      <Outlet />
    </div>
  )
}
