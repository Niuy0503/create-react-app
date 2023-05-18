import React from 'react'

class ref extends React.Component {
myRef = React.createRef()

    render() {
        return (
        <div>
            <input type="text" ref={this.myRef}>输入数据1</input>
            <button onClick={this.showref}>点击</button>
            <input type="text" ref={"ipt2"}>输入数据2</input>
        </div>
        )
    }
    showref = () => {
        alert(this.myRef.current.value)
        }
}
export default ref;