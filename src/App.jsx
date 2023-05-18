import React, { useState } from 'react'
import { Layout, } from 'antd';
import './App.css';
// import MdEditor from 'md-editor-rt'
// import 'md-editor-rt/lib/style.css'

export default function App() {
  const { Header, Content, Footer } = Layout;

  return (
    <div className='App'>
      <Layout style={{ width: '100%', minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
      </Header>
      <Content className="site-layout">
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
    </div>
  )
}

// import React from 'react'
// import * as ReactDOM from 'react-dom';
// import MarkdownIt from 'markdown-it'
// import MdEditor from 'react-markdown-editor-lite'
// import 'react-markdown-editor-lite/lib/index.css'
// export default function App() {
//   const mdParser = new MarkdownIt(/* Markdown-it options */);
//   function handleEditorChange({html, text}) {    
//     console.log('handleEditorChange', html, text)
//   }
//   return (
//     <div>
//           <MdEditor
//       style={{ height: 500 }}
//       renderHTML={(text) => mdParser.render(text)}
//       onChange={handleEditorChange}
//     />
//     </div>
//   )
// }
