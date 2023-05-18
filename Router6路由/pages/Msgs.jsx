import React from 'react'
// import { useParams } from 'react-router-dom' // params传参
// import { useSearchParams } from 'react-router-dom' // search传参
import { useLocation } from 'react-router-dom'
export default function Msgs() {
  // params解构参数
  // const { id, title, content } = useParams()

  // search解构参数
  // const [search, setSearch] = useSearchParams()
  // const id = search.get('id')
  // const title = search.get('title')
  // const content = search.get('content')

  // state解构参数
  const { state: {id,title,content } } = useLocation()
  return (
          <ul>
            <li>{id}</li>
            <li>{title}</li>
            <li>{content}</li>
          </ul>
  )
}
