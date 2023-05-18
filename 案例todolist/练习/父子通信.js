import React, { Component,useState } from 'react'
// 类组件通信
class Son extends Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    const { name,age,sex } = this.props;
        return (
      <h2>子组件接收：{name + age + sex}</h2>
    )
  }
}

// 函数组件通信
function Sontwo(props) {
  const { name, age, sex, onClick } = props;
  const [num,setNum] = useState(1)
  return (
    <div>
    <h2>子组件接收：{name + age + sex}</h2>
    <h3>{num}</h3>
    <button onClick={(e) => setNum(num + 1)}>+1</button>
    <button onClick={onClick}>hhhhh</button>
    </div>
  )
}
export default class App extends Component {

  constructor(props) {
    super(props)
 
    this.state = {
      count:1
    }
    console.log('执行了constructor');
  }

  render() {
    console.log('执行render');
    return (
      <div>
        <h1>
          APP组件
        </h1>``
        <button onClick={() =>this.btnclick()}>点击+1</button>
        <hr />
        <Son name="张三" age="18" sex="男" />
        <Sontwo name="李四" age="18" sex="男"/>
      </div>
)}

// componentDidMount() {
//   console.log('挂载阶段');
// }
// componentDidUpdate() {
//   console.log('更新阶段');
// }
// componentWillUnmount() {
//   console.log('销毁阶段');
// }
btnclick() {
  this.setState({
    count: this.state.count + 1
  })
}
    }