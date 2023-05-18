import React, { useState } from 'react'
import { Layout, } from 'antd';
import MdEditor from 'md-editor-rt'
import './App.css';
import 'md-editor-rt/lib/style.css'

export default function App() {
  const { Header, Content, Footer } = Layout;
  const [text, setText] = useState('hello md-editor-rt！');
  const [theme, setTheme] = useState('light'); // 编辑器主题
  const [historyLength, setHistoryLength] = useState(10); // 最大记录操作数（太多会占用内存）
  const [pageFullscreen, setPageFullscreen] = useState(false); // 页面内全屏
  const [preview, setPreview] = useState(true); // 是否显示预览
  const [language, setLanguage] = useState('zh-CN'); // 中英文切换
  const [toolbars, setToolbars] = useState([]);

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
      <MdEditor modelValue={text} onChange={setText}/>
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
